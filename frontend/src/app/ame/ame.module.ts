import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StoreModule } from '@core/store/store.module';

import { AmeRoutingModule } from './ame-routing.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, AmeRoutingModule, StoreModule],
})
export class AmeModule {}
