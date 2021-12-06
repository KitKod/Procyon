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
import { AME_FAMILIES } from '@core/constants/ame-options';

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

    readonly ameFamilies = AME_FAMILIES;

    readonly destroy$: ReplaySubject<void> = new ReplaySubject<void>(1);

    constructor(
        private dialogRef: MatDialogRef<AddAmeDialogComponent>,
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
        // const { date_of_approval, ...ameInfo } = this.ameInfoStepFormGroup.value;
        // const ameInfo = this.ameInfoStepFormGroup.value;
        // const manufacturerInfo = this.manufacturerInfoStepFormGroup.value;
        //
        // this.store
        //     .dispatch(
        //         new AmeActions.Add({
        //             ...ameInfo,
        //             date_of_approval: this.datePipe.transform(date_of_approval, API_DATE_FORMAT),
        //             ame: {
        //                 ...ameInfo,
        //                 manufacturer:
        //                     ameInfo.manufacturer !== this.createNewManufacturerId
        //                         ? { id: ameInfo.manufacturer }
        //                         : manufacturerInfo,
        //             },
        //         }),
        //     )
        //     .subscribe(ame => {
        this.dialogRef.close();
        //     });
    }
}
