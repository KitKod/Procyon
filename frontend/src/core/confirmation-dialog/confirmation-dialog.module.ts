import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
    imports: [CommonModule, MatButtonModule, A11yModule, MatDialogModule],
    declarations: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
