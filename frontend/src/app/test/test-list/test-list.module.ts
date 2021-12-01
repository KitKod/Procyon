import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
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
        RouterModule,
    ],
})
export class TestListModule {}
