import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { TestActions, TestState, TestUpdateModel } from '@core/store/test';
import { TestDocumentState } from '@core/store/test/document';
import { TEST_STATUSES, TEST_TYPES } from '@core/constants/test-constants';
import { API_DATE_FORMAT } from '@core/constants/api';
import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { DOCUMENTS_GROUPS_BY_TYPE } from '@core/constants/test-documnet-constants';

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

    readonly destroy$ = new ReplaySubject<void>(1);

    readonly documents$ = this.store
        .select(TestDocumentState.documents(this.activatedRoute.snapshot.params.id))
        .pipe(map(documents => documents.filter(({ type }) => DOCUMENTS_GROUPS_BY_TYPE.document.includes(type))));

    readonly programs$ = this.store
        .select(TestDocumentState.documents(this.activatedRoute.snapshot.params.id))
        .pipe(map(documents => documents.filter(({ type }) => DOCUMENTS_GROUPS_BY_TYPE.program.includes(type))));

    readonly methods$ = this.store
        .select(TestDocumentState.documents(this.activatedRoute.snapshot.params.id))
        .pipe(map(documents => documents.filter(({ type }) => DOCUMENTS_GROUPS_BY_TYPE.method.includes(type))));

    constructor(
        private store: Store,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private router: Router,
        private confirmSrv: ConfirmationDialogService,
    ) {}

    ngOnInit(): void {
        this.store
            .dispatch(new TestActions.GetById(this.activatedRoute.snapshot.params.id))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.resetForm());
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

    // addDocument(type: TestDocumentType): void {}
}
