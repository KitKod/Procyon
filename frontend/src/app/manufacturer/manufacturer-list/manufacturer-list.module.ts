import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ManufacturerListComponent } from './manufacturer-list.component';
import { ManufacturerListRoutingModule } from './manufacturer-list-routing.module';
import { AddManufacturerDialogModule } from './add-manufacturer-dialog/add-manufacturer-dialog.module';

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
