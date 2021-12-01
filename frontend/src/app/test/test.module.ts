import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { TestState } from '../store/test';
import { TestApiService } from '../store/test/test-api.service';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, TestRoutingModule, NgxsModule.forFeature([TestState])],
    providers: [TestApiService],
})
export class TestModule {}
