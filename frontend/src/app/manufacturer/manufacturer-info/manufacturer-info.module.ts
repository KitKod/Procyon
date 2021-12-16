import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { ConfirmationDialogModule } from '@core/confirmation-dialog';

import { ManufacturerInfoComponent } from './manufacturer-info.component';
import { ManufacturerInfoRoutingModule } from './manufacturer-info-routing.module';

@NgModule({
    declarations: [ManufacturerInfoComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        ManufacturerInfoRoutingModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatExpansionModule,
        NgxsModule.forFeature([]),
        MatFormFieldModule,
        MatInputModule,
        ConfirmationDialogModule,
    ],
})
export class ManufacturerInfoModule {}
