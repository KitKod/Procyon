import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { AddManufacturerDialogModule } from './add-manufacturer-dialog/add-manufacturer-dialog.module';
import { ManufacturerListComponent } from './manufacturer-list.component';
import { ManufacturerListRoutingModule } from './manufacturer-list-routing.module';

@NgModule({
    declarations: [ManufacturerListComponent],
    imports: [
        CommonModule,
        ManufacturerListRoutingModule,
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        RouterModule,
        AddManufacturerDialogModule,
        MatCardModule,
    ],
})
export class ManufacturerListModule {}
