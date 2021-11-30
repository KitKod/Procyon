import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TestOvtListComponent } from './test-ovt-list.component';
import { TestOvtListRoutingModule } from './test-ovt-list-routing.module';

@NgModule({
    declarations: [TestOvtListComponent],
    imports: [
        CommonModule,
        TestOvtListRoutingModule,
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
    ],
})
export class TestOvtListModule {}
