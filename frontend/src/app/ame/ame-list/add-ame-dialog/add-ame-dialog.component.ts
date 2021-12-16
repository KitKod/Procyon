import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { AME_FAMILIES } from '@core/constants/ame-constants';
import { AmeActions } from '@core/store/ame';
import { getAmeFamilyLocalization } from '@core/utils/localization';

@Component({
    selector: 'procyon-add-ame-dialog',
    templateUrl: './add-ame-dialog.component.html',
})
export class AddAmeDialogComponent implements OnInit, OnDestroy {
    readonly createNewManufacturerId = -1;

    readonly ameInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        family: ['', Validators.required],
        type: ['', Validators.required],
        ttc_file: [null, Validators.required],
        manufacturer_id: [this.createNewManufacturerId],
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

    readonly ameFamilies = AME_FAMILIES;
    readonly getAmeFamily = getAmeFamilyLocalization;

    readonly destroy$: ReplaySubject<void> = new ReplaySubject<void>(1);

    constructor(
        private dialogRef: MatDialogRef<AddAmeDialogComponent>,
        private fb: FormBuilder,
        private breakpointObserver: BreakpointObserver,
        private confirmSrv: ConfirmationDialogService,
        private store: Store,
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
                label: 'Yes',
                handler: () => this.dialogRef.close(),
            },
        });
    }

    onSave(): void {
        const { manufacturer_id, ...ameInfo } = this.ameInfoStepFormGroup.value;
        const manufacturerInfo = this.manufacturerInfoStepFormGroup.value;

        this.store
            .dispatch(
                new AmeActions.Add({
                    ...ameInfo,
                    ...(manufacturer_id ? { manufacturer_id } : manufacturerInfo),
                }),
            )
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}
