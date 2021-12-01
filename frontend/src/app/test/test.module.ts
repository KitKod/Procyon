import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestRoutingModule } from './test-routing.module';
import { StoreModule } from '@core/store/store.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, TestRoutingModule, StoreModule],
})
export class TestModule {}
