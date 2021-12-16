import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmationDialogData } from '@core/confirmation-dialog/confirmation-dialog.data';

@Component({
    selector: 'procyon-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) readonly data: ConfirmationDialogData) {}
}
