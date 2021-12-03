import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogState } from '@angular/material/dialog/dialog-ref';
import { ConfirmationDialogModule } from '@core/confirmation-dialog/confirmation-dialog.module';
import { ConfirmationDialogData } from '@core/confirmation-dialog/confirmation-dialog.data';
import { ConfirmationDialogComponent } from '@core/confirmation-dialog/confirmation-dialog.component';

@Injectable({ providedIn: ConfirmationDialogModule })
export class ConfirmationDialogService {
    private currentDialogRef?: MatDialogRef<ConfirmationDialogComponent>;

    constructor(private matDialog: MatDialog) {}

    open(data: ConfirmationDialogData): void {
        this.currentDialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            data,
            autoFocus: true,
            closeOnNavigation: true,
            restoreFocus: true,
        });

        this.currentDialogRef.afterClosed().subscribe(result => {
            if (result) {
                data.affirmative.handler();
            } else {
                data.dismissive?.handler?.();
            }
        });
        this.currentDialogRef.backdropClick().subscribe(() => data.dismissive?.handler?.());
    }

    close(): void {
        if (this.currentDialogRef?.getState() !== MatDialogState.OPEN) {
            return;
        }

        const { data } = this.currentDialogRef.componentInstance;
        data?.dismissive?.handler?.();
        this.currentDialogRef.close();
    }
}
