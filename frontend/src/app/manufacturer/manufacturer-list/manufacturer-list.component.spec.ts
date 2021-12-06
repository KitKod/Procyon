// import { ComponentFixture, ManufactureBed } from '@angular/core/manufactureing';
//
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { MatTableModule } from '@angular/material/table';
// import { MatToolbarModule } from '@angular/material/toolbar';
//
// import { NgxsModule } from '@ngxs/store';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ManufactureState } from '@core/store/manufacturer';
// import { ManufactureApiService } from '@core/store/manufacturer/manufacturer-api.service';
// import { ManufactureListComponent } from './manufacturer-list.component';
//
// describe('ManufactureListComponent', () => {
//     let component: ManufactureListComponent;
//     let fixture: ComponentFixture<ManufactureListComponent>;
//
//     beforeEach(async () => {
//         await ManufactureBed.configureManufactureingModule({
//             imports: [MatTableModule, MatToolbarModule, HttpClientTestingModule, NgxsModule.forRoot([ManufactureState])],
//             declarations: [ManufactureListComponent],
//             providers: [ManufactureApiService],
//             schemas: [NO_ERRORS_SCHEMA],
//         }).compileComponents();
//     });
//
//     beforeEach(() => {
//         fixture = ManufactureBed.createComponent(ManufactureListComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
