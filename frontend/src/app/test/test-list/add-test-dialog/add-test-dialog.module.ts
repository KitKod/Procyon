import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddTestDialogComponent } from './add-test-dialog.component';
import { ConfirmationDialogModule } from '@core/confirmation-dialog';

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
    declarations: [AddTestDialogComponent],
    exports: [AddTestDialogComponent],
})
export class AddTestDialogModule {}
