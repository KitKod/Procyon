import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { TestState } from '@core/store/test';
import { TestApiService } from '@core/store/test/test-api.service';
import { TestDocumentApiService } from '@core/store/test/document/document-api.service';
import { AmeApiService } from '@core/store/ame/ame-api.service';
import { ManufacturerApiService } from '@core/store/manufacturer/manufacturer-api.service';
import { AmeState } from '@core/store/ame';
import { ManufacturerState } from '@core/store/manufacturer';
import { TestDocumentState } from '@core/store/test/document';

@NgModule({
    imports: [HttpClientModule, NgxsModule.forFeature([TestState, AmeState, ManufacturerState, TestDocumentState])],
    providers: [TestApiService, TestDocumentApiService, AmeApiService, ManufacturerApiService],
})
export class StoreModule {}
