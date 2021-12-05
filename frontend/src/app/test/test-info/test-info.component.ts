import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { takeUntil, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { TestActions, TestState, TestUpdateModel } from '@core/store/test';
import { TestDocumentModel, DocumentAddModel, DocumentUpdateModel } from '@core/store/test/test.model';
import { TEST_STATUSES, TEST_TYPES } from '@core/constants/test-options';
import { WithoutId } from '@core/utility-types';
import { API_DATE_FORMAT } from '@core/constants/api';
import { ConfirmationDialogService } from '@core/confirmation-dialog';

function createDocumentForm(fb: FormBuilder): FormGroup {
    return fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        type: ['', Validators.required],
        status: ['', Validators.required],
        government: ['', Validators.required],
        date_of_approval: ['', Validators.required],
        material_and_technical_means: ['', Validators.required],
    });
}
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

    readonly documents$ = new BehaviorSubject<WithoutId<TestDocumentModel>[]>([
        {
            name: 'document-order-for-test.doc',
            type: 'order',
            status: 'approved',
            government: 'Ministry_of_Defence',
            date_of_approval: '11-11-2021',
            material_and_technical_means: '',
        },
        {
            name: 'separate-order-test-124.doc',
            type: 'separate_order',
            status: 'developing',
            government: 'ZMO',
            date_of_approval: '',
            material_and_technical_means: '',
        },
        {
            name: '',
            type: 'joint_decision',
            status: 'developing',
            government: 'ZNGSH',
            date_of_approval: '',
            material_and_technical_means: '',
        },
    ]);

    readonly programs$ = new BehaviorSubject<WithoutId<TestDocumentModel>[]>([
        {
            name: 'program-for-test.pdf',
            type: 'program',
            status: 'approving',
            government: 'Chief_of_DNDІ_VS_OVT',
            date_of_approval: '',
            material_and_technical_means: '',
        },
    ]);

    readonly methods$ = new BehaviorSubject<WithoutId<TestDocumentModel>[]>([
        {
            name: 'method-for-testing-1.doc',
            type: 'method',
            status: 'approved',
            government: 'Chief_of_DNDІ_VS_OVT',
            date_of_approval: '12-11-2021',
            material_and_technical_means: '',
        },
        {
            name: 'method-for-testing-3.doc',
            type: 'method',
            status: 'approving',
            government: 'ZNGSH',
            date_of_approval: '',
            material_and_technical_means: '',
        },
        {
            name: '',
            type: 'method',
            status: 'developing',
            government: 'ZNGSH',
            date_of_approval: '',
            material_and_technical_means: '',
        },
    ]);

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
