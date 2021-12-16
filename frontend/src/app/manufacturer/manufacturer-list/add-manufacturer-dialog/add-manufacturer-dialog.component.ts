import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { ManufacturerActions } from '@core/store/manufacturer';

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
            message: 'Усі незбережені дані будуть втрачені. Ви впевнені, що хочете закрити вікно?',
            title: 'Підтвердьте',
            affirmative: {
                label: 'Так',
                handler: () => this.dialogRef.close(),
            },
        });
    }

    onSave(): void {
        const manufacturer = this.manufacturerInfoStepFormGroup.value;

        this.store.dispatch(new ManufacturerActions.Add(manufacturer)).subscribe(() => {
            this.dialogRef.close();
        });
    }
}
