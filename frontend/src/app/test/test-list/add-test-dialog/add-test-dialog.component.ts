import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { AME_FAMILIES } from '@core/constants/ame-constants';
import { API_DATE_FORMAT } from '@core/constants/api';
import { TEST_STATUSES, TEST_TYPES } from '@core/constants/test-constants';
import { TestActions, TestStatus } from '@core/store/test';
import { getAmeFamilyLocalization, getTestStatusLocalization, getTestTypeLocalization } from '@core/utils/localization';

import { AddTestDialogResult } from './add-test-dialog.data';

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

    readonly getTestType = getTestTypeLocalization;
    readonly getTestStatus = getTestStatusLocalization;
    readonly getAmeFamily = getAmeFamilyLocalization;

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
            title: 'Підтвердьте',
            message: 'Усі незбережені дані будуть втрачені. Ви впевнені, що хочете закрити вікно?',
            affirmative: {
                label: 'Так',
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
