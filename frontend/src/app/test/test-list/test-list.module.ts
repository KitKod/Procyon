import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { TestListComponent } from './test-list.component';
import { TestListRoutingModule } from './test-list-routing.module';
import { AddTestDialogModule } from './add-test-dialog/add-test-dialog.module';

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
    ],
})
export class TestListModule {}
