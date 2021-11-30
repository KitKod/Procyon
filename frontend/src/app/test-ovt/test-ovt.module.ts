import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { TestOvtState } from '../store/test-ovt';
import { TestOvtApiService } from '../store/test-ovt/test-ovt-api.service';
import { TestOvtRoutingModule } from './test-ovt-routing.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, TestOvtRoutingModule, NgxsModule.forFeature([TestOvtState])],
    providers: [TestOvtApiService],
})
export class TestOvtModule {}
