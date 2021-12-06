import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Store } from '@ngxs/store';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from '@core/confirmation-dialog';

@Component({
    selector: 'procyon-add-manufacturer-dialog',
    templateUrl: './add-manufacturer-dialog.component.html',
})
export class AddManufacturerDialogComponent implements OnInit, OnDestroy {
    readonly manufacturerInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        chief: ['', Validators.required],
        contact: ['', Validators.required],
    });

    readonly destroy$: ReplaySubject<void> = new ReplaySubject<void>(1);

    constructor(
        private dialogRef: MatDialogRef<AddManufacturerDialogComponent>,
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
        // const { date_of_approval, ...manufactureInfo } = this.manufactureInfoStepFormGroup.value;
        // const manufactureInfo = this.manufactureInfoStepFormGroup.value;
        // const manufacturerInfo = this.manufacturerInfoStepFormGroup.value;
        //
        // this.store
        //     .dispatch(
        //         new ManufactureActions.Add({
        //             ...manufactureInfo,
        //             date_of_approval: this.datePipe.transform(date_of_approval, API_DATE_FORMAT),
        //             manufacturer: {
        //                 ...manufactureInfo,
        //                 manufacturer:
        //                     manufactureInfo.manufacturer !== this.createNewManufacturerId
        //                         ? { id: manufactureInfo.manufacturer }
        //                         : manufacturerInfo,
        //             },
        //         }),
        //     )
        //     .subscribe(manufacturer => {
        this.dialogRef.close();
        //     });
    }
}
