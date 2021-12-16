import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StoreModule } from '@core/store/store.module';

import { TestRoutingModule } from './test-routing.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, TestRoutingModule, StoreModule],
})
export class TestModule {}
