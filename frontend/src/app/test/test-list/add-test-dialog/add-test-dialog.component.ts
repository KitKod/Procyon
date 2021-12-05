import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Store } from '@ngxs/store';
import { DatePipe } from '@angular/common';
import { AddTestDialogResult } from './add-test-dialog.data';
import { TestStatus, TestActions } from '@core/store/test';
import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { API_DATE_FORMAT } from '@core/constants/api';
import { TEST_STATUSES, TEST_TYPES } from '@core/constants/test-options';
import { AME_FAMILIES } from '@core/constants/ame-options';

const DEFAULT_TEST_STATUS: TestStatus = 'preparation';

@Component({
    selector: 'procyon-add-test-dialog',
    templateUrl: './add-test-dialog.component.html',
    styleUrls: ['./add-test-dialog.component.scss'],
})
export class AddTestDialogComponent implements OnInit, OnDestroy {
    readonly createNewManufacturerId = -1;

    readonly testInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        location: ['', Validators.required],
        status: [DEFAULT_TEST_STATUS, Validators.required],
        date_of_approval: [new Date(), Validators.required],
    });

    readonly ameInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        family: ['', Validators.required],
        type: ['', Validators.required],
        ttc_file: [null, Validators.required],
        manufacturer: [this.createNewManufacturerId],
    });

    readonly manufacturerInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        chief: ['', Validators.required],
        contact: ['', Validators.required],
    });

    readonly stepperOrientation$: Observable<StepperOrientation> = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    readonly testStatuses = TEST_STATUSES;
    readonly testTypes = TEST_TYPES;
    readonly ameFamilies = AME_FAMILIES;

    readonly destroy$: ReplaySubject<void> = new ReplaySubject<void>(1);

    constructor(
        private dialogRef: MatDialogRef<AddTestDialogComponent, AddTestDialogResult>,
        private fb: FormBuilder,
        private breakpointObserver: BreakpointObserver,
        private confirmSrv: ConfirmationDialogService,
        private store: Store,
        private datePipe: DatePipe,
    ) {
        dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.dialogRef
            .backdropClick()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.closeWithoutSave());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    closeWithoutSave(): void {
        this.confirmSrv.open({
            message: 'All unsaved data will be lost, are you sure you want to leave the dialog?',
            title: 'Confirm',
            affirmative: {
                label: 'Yes',
                handler: () => this.dialogRef.close(),
            },
        });
    }

    onSave(): void {
        const { date_of_approval, ...testInfo } = this.testInfoStepFormGroup.value;
        const ameInfo = this.ameInfoStepFormGroup.value;
        const manufacturerInfo = this.manufacturerInfoStepFormGroup.value;

        this.store
            .dispatch(
                new TestActions.Add({
                    ...testInfo,
                    date_of_approval: this.datePipe.transform(date_of_approval, API_DATE_FORMAT),
                    ame: {
                        ...ameInfo,
                        manufacturer:
                            ameInfo.manufacturer !== this.createNewManufacturerId
                                ? { id: ameInfo.manufacturer }
                                : manufacturerInfo,
                    },
                }),
            )
            .subscribe(test => {
                this.dialogRef.close(test);
            });
    }
}
