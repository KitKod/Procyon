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
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { ConfirmationDialogModule } from '@core/confirmation-dialog';

import { AmeInfoComponent } from './ame-info.component';
import { AmeInfoRoutingModule } from './ame-info-routing.module';

@NgModule({
    declarations: [AmeInfoComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AmeInfoRoutingModule,
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
        ConfirmationDialogModule,
    ],
})
export class AmeInfoModule {}
