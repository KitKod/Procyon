import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ManageDocumentDialogComponent } from './manage-document-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonModule,
    ],
    declarations: [ManageDocumentDialogComponent],
    providers: [DatePipe],
})
export class ManageDocumentDialogModule {}
