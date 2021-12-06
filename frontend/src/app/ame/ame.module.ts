import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AmeRoutingModule } from './ame-routing.module';
import { StoreModule } from '@core/store/store.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, AmeRoutingModule, StoreModule],
})
export class AmeModule {}
