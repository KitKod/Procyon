// import { ComponentFixture, AmeBed } from '@angular/core/ameing';
//
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { MatTableModule } from '@angular/material/table';
// import { MatToolbarModule } from '@angular/material/toolbar';
//
// import { NgxsModule } from '@ngxs/store';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AmeState } from '@core/store/ame';
// import { AmeApiService } from '@core/store/ame/ame-api.service';
// import { AmeListComponent } from './ame-list.component';
//
// describe('AmeListComponent', () => {
//     let component: AmeListComponent;
//     let fixture: ComponentFixture<AmeListComponent>;
//
//     beforeEach(async () => {
//         await AmeBed.configureAmeingModule({
//             imports: [MatTableModule, MatToolbarModule, HttpClientTestingModule, NgxsModule.forRoot([AmeState])],
//             declarations: [AmeListComponent],
//             providers: [AmeApiService],
//             schemas: [NO_ERRORS_SCHEMA],
//         }).compileComponents();
//     });
//
//     beforeEach(() => {
//         fixture = AmeBed.createComponent(AmeListComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
