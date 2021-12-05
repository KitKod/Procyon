import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ManageDocumentDialogComponent } from './manage-document-dialog.component';

@NgModule({
    imports: [CommonModule, MatDialogModule],
    declarations: [ManageDocumentDialogComponent],
    providers: [DatePipe],
})
export class ManageDocumentDialogModule {}
