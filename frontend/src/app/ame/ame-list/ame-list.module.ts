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
import { AmeListComponent } from './ame-list.component';
import { AmeListRoutingModule } from './ame-list-routing.module';
import { AddAmeDialogModule } from './add-ame-dialog/add-ame-dialog.module';

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
