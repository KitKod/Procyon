import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestOvtInfoComponent } from './test-ovt-info.component';
import { TestOvtInfoRoutingModule } from './test-ovt-info-routing.module';

@NgModule({
    declarations: [TestOvtInfoComponent],
    imports: [CommonModule, TestOvtInfoRoutingModule],
})
export class TestOvtInfoModule {}
