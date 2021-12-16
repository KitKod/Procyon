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

import { AddTestDialogModule } from './add-test-dialog/add-test-dialog.module';
import { TestListComponent } from './test-list.component';
import { TestListRoutingModule } from './test-list-routing.module';

@NgModule({
    declarations: [TestListComponent],
    imports: [
        CommonModule,
        TestListRoutingModule,
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        RouterModule,
        AddTestDialogModule,
        MatCardModule,
    ],
})
export class TestListModule {}
