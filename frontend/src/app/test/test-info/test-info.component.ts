import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil, map, filter, first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ManageDocumentDialogComponent } from './manage-document-dialog/manage-document-dialog.component';
import { ManageDocumentDialogData } from './manage-document-dialog/manage-document-dialog.data';
import { DocumentStatusChanged } from './documents-panel/documents-panel.component';
import { TestActions, TestState, TestUpdateModel } from '@core/store/test';
import {
    TestDocumentState,
    TestDocumentActions,
    TestDocumentModel,
    TestDocumentType,
    DocumentAddModel,
    DocumentUpdateModel,
} from '@core/store/test/document';
import { TEST_STATUSES, TEST_TYPES } from '@core/constants/test-constants';
import { API_DATE_FORMAT } from '@core/constants/api';
import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { DOCUMENTS_GROUPS_BY_TYPE } from '@core/constants/test-documnet-constants';
import { WithoutId } from '@core/utility-types';

const MAXIMUM_ALLOWED_DOCUMENTS = DOCUMENTS_GROUPS_BY_TYPE.document.length;
const MAXIMUM_ALLOWED_PROGRAMS = 1;
const MAXIMUM_ALLOWED_METHODS = Number.MAX_SAFE_INTEGER;

@Component({
    selector: 'procyon-test-info',
    templateUrl: './test-info.component.html',
    styleUrls: ['./test-info.component.scss'],
})
export class TestInfoComponent implements OnInit, OnDestroy {
    readonly testForm = this.fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        type: ['', Validators.required],
        location: ['', Validators.required],
        date_of_approval: [''],
        status: ['', Validators.required],
        ame: this.fb.group({
            id: [0, Validators.required],
            name: [0, Validators.required],
        }),
        documents: this.fb.array([]),
    });

    readonly testStatuses = TEST_STATUSES;
    readonly testTypes = TEST_TYPES;

    editModeEnabled$ = new BehaviorSubject(false);
    viewModeEnabled$ = this.editModeEnabled$.pipe(map(v => !v));

    readonly documents$ = this.store
        .select(TestDocumentState.documents(this.activatedRoute.snapshot.params.id))
        .pipe(map(documents => documents.filter(({ type }) => DOCUMENTS_GROUPS_BY_TYPE.document.includes(type))));

    readonly programs$ = this.store
        .select(TestDocumentState.documents(this.activatedRoute.snapshot.params.id))
        .pipe(map(documents => documents.filter(({ type }) => DOCUMENTS_GROUPS_BY_TYPE.program.includes(type))));

    readonly methods$ = this.store
        .select(TestDocumentState.documents(this.activatedRoute.snapshot.params.id))
        .pipe(map(documents => documents.filter(({ type }) => DOCUMENTS_GROUPS_BY_TYPE.method.includes(type))));

    readonly canAddDocuments$ = this.documents$.pipe(map(docs => docs.length < MAXIMUM_ALLOWED_DOCUMENTS));
    readonly canAddPrograms$ = this.programs$.pipe(map(docs => docs.length < MAXIMUM_ALLOWED_PROGRAMS));
    readonly canAddMethods$ = this.methods$.pipe(map(docs => docs.length < MAXIMUM_ALLOWED_METHODS));

    get testId(): number {
        return Number(this.activatedRoute.snapshot.params.id);
    }

    private readonly destroy$ = new ReplaySubject<void>(1);

    constructor(
        private store: Store,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private router: Router,
        private confirmSrv: ConfirmationDialogService,
        private matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.store
            .dispatch(new TestActions.GetById(this.testId))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.resetForm());

        this.store.dispatch(new TestDocumentActions.GetAllForTest(this.testId));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    resetForm(): void {
        this.testForm.reset(this.store.selectSnapshot(TestState.testToEdit) || {});
    }

    enableEditMode(): void {
        this.editModeEnabled$.next(true);
    }

    cancelEdit(): void {
        this.editModeEnabled$.next(false);
        this.resetForm();
    }

    saveTest(): void {
        const initialTest = this.store.selectSnapshot(TestState.testToEdit);
        const { id, ame, documents, date_of_approval, ...formValue } = this.testForm.value;

        const updatedTest = Object.entries({
            date_of_approval: this.datePipe.transform(date_of_approval, API_DATE_FORMAT),
            ...formValue,
        }).reduce((acc: Record<string, unknown>, [key, value]) => {
            if (initialTest?.[key as keyof typeof initialTest] !== value) {
                acc[key] = value;
            }

            return acc as TestUpdateModel;
        }, {} as TestUpdateModel);

        this.store
            .dispatch(
                new TestActions.Update({
                    id,
                    ...updatedTest,
                }),
            )
            .subscribe(() => {
                this.editModeEnabled$.next(false);
                this.resetForm();
            });
    }

    deleteTest(): void {
        this.confirmSrv.open({
            title: 'Confirm deletion',
            message: `Are you sure you want to delete the test?`,
            affirmative: {
                label: 'Delete',
                handler: () =>
                    this.store.dispatch(new TestActions.Delete(this.testForm.value)).subscribe(() => {
                        this.router.navigate(['/tests']);
                    }),
            },
        });
    }

    addDocument(type: keyof typeof DOCUMENTS_GROUPS_BY_TYPE, alreadyAdded: TestDocumentModel[]): void {
        const availableTypes: TestDocumentType[] = [];
        const usedTypes = alreadyAdded.map(v => v.type);
        console.log(usedTypes);
        switch (type) {
            case 'document':
                availableTypes.push(...DOCUMENTS_GROUPS_BY_TYPE[type].filter(v => !usedTypes.includes(v)));
                break;
            case 'program':
                availableTypes.push('program');
                break;
            case 'method':
                availableTypes.push('method');
                break;
            default:
                break;
        }
        const lastTypeLeft = availableTypes.length === 1 ? availableTypes[0] : null;

        this.matDialog.open<ManageDocumentDialogComponent, ManageDocumentDialogData>(ManageDocumentDialogComponent, {
            data: {
                title: `Add "${lastTypeLeft}"`,
                canUploadFile: true,
                availableTypes,
                prefilledData: {
                    ...(lastTypeLeft && { type: lastTypeLeft }),
                    status: 'developing',
                },
                onSaveCallback: document => {
                    this.store.dispatch(new TestDocumentActions.Add(this.testId, document));
                },
            },
            width: '500px',
        });
    }

    editDocument(document: TestDocumentModel): void {
        this.matDialog.open<ManageDocumentDialogComponent, ManageDocumentDialogData>(ManageDocumentDialogComponent, {
            data: {
                title: `Edit "${document.type}" ${document.name}`,
                availableTypes: [document.type],
                prefilledData: document,
                onSaveCallback: updateDocument => {
                    this.store.dispatch(
                        new TestDocumentActions.Update(
                            this.testId,
                            this.getChangedProperties(document, updateDocument),
                        ),
                    );
                },
            },
            width: '500px',
        });
    }

    removeDocument(document: TestDocumentModel): void {
        this.confirmSrv.open({
            title: 'Confirm deletion',
            message: `Are you sure you want to delete ${document.type} "<b>${document.name}</b>"?`,
            affirmative: {
                label: 'Delete',
                handler: () => {
                    this.store.dispatch(new TestDocumentActions.Delete(this.testId, document));
                },
            },
        });
    }

    downloadDocument({ id }: TestDocumentModel): void {
        this.store.dispatch(new TestDocumentActions.Download(this.testId, id));
        this.store
            .select(TestDocumentState.documentFile(this.testId, id))
            .pipe(filter(Boolean), first())
            .subscribe(file => {
                const url = window.URL.createObjectURL(file);
                window.open(url, '_blank')?.focus();
            });
    }

    getChangedProperties<T extends DocumentAddModel | DocumentUpdateModel>(
        initial: TestDocumentModel,
        document: Partial<TestDocumentModel>,
    ): T {
        return Object.entries(document).reduce<T>(
            (acc: Record<string, unknown>, [key, value]) => {
                if (initial?.[key as keyof typeof initial] !== value) {
                    acc[key] = value;
                }

                return acc as T;
            },
            { id: initial.id } as T,
        );
    }

    changeDocumentStatus(change: DocumentStatusChanged): void {
        this.store.dispatch(
            new TestDocumentActions.Update(this.testId, {
                id: change.document.id,
                status: change.newStatus,
                date_of_approval:
                    change.newStatus === 'approved'
                        ? (this.datePipe.transform(new Date(), API_DATE_FORMAT) as string)
                        : '',
            }),
        );
    }
}
