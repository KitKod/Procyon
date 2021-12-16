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

import { AddAmeDialogModule } from './add-ame-dialog/add-ame-dialog.module';
import { AmeListComponent } from './ame-list.component';
import { AmeListRoutingModule } from './ame-list-routing.module';

@NgModule({
    declarations: [AmeListComponent],
    imports: [
        CommonModule,
        AmeListRoutingModule,
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        RouterModule,
        AddAmeDialogModule,
        MatCardModule,
    ],
})
export class AmeListModule {}
