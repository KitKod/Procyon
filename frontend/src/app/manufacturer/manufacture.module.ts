import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StoreModule } from '@core/store/store.module';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, ManufacturerRoutingModule, StoreModule],
})
export class ManufacturerModule {}
