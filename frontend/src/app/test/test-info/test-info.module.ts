import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { ConfirmationDialogModule } from '@core/confirmation-dialog';

import { DocumentItemComponent } from './documents-panel/document-item/document-item.component';
import { DocumentsPanelComponent } from './documents-panel/documents-panel.component';
import { ManageDocumentDialogModule } from './manage-document-dialog';
import { TestInfoComponent } from './test-info.component';
import { TestInfoRoutingModule } from './test-info-routing.module';

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
