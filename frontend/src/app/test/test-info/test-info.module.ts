import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxsModule } from '@ngxs/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { TestInfoComponent } from './test-info.component';
import { TestInfoRoutingModule } from './test-info-routing.module';
import { DocumentItemComponent } from './documents-panel/document-item/document-item.component';
import { DocumentsPanelComponent } from './documents-panel/documents-panel.component';
import { ManageDocumentDialogModule } from './manage-document-dialog';
import { ConfirmationDialogModule } from '@core/confirmation-dialog';

@NgModule({
    declarations: [TestInfoComponent, DocumentItemComponent, DocumentsPanelComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TestInfoRoutingModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatExpansionModule,
        NgxsModule.forFeature([]),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        ConfirmationDialogModule,
        ManageDocumentDialogModule,
    ],
    providers: [DatePipe],
})
export class TestInfoModule {}
