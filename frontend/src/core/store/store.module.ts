import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AmeState } from '@core/store/ame';
import { AmeApiService } from '@core/store/ame/ame-api.service';
import { ManufacturerState } from '@core/store/manufacturer';
import { ManufacturerApiService } from '@core/store/manufacturer/manufacturer-api.service';
import { TestState } from '@core/store/test';
import { TestDocumentState } from '@core/store/test/document';
import { TestDocumentApiService } from '@core/store/test/document/document-api.service';
import { TestApiService } from '@core/store/test/test-api.service';

@NgModule({
    imports: [HttpClientModule, NgxsModule.forFeature([TestState, AmeState, ManufacturerState, TestDocumentState])],
    providers: [TestApiService, TestDocumentApiService, AmeApiService, ManufacturerApiService],
})
export class StoreModule {}
