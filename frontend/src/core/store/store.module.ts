import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { TestState } from '@core/store/test';
import { TestApiService } from '@core/store/test/test-api.service';

@NgModule({
    imports: [HttpClientModule, NgxsModule.forFeature([TestState])],
    providers: [TestApiService],
})
export class StoreModule {}
