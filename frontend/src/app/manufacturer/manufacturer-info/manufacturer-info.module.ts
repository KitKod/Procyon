import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ManufacturerInfoComponent } from './manufacturer-info.component';
import { ManufacturerInfoRoutingModule } from './manufacturer-info-routing.module';
import { ConfirmationDialogModule } from '@core/confirmation-dialog';

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
