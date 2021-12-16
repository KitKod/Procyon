import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { ConfirmationDialogModule } from '@core/confirmation-dialog';

import { AddManufacturerDialogComponent } from './add-manufacturer-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatIconModule,
        MatDividerModule,
        ConfirmationDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [DatePipe],
    declarations: [AddManufacturerDialogComponent],
    exports: [AddManufacturerDialogComponent],
})
export class AddManufacturerDialogModule {}
