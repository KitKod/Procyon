import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxsModule } from '@ngxs/store';

import { TestState } from '@core/store/test';
import { TestApiService } from '@core/store/test/test-api.service';

import { TestListComponent } from './test-list.component';

describe('TestListComponent', () => {
    let component: TestListComponent;
    let fixture: ComponentFixture<TestListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatTableModule, MatToolbarModule, HttpClientTestingModule, NgxsModule.forRoot([TestState])],
            declarations: [TestListComponent],
            providers: [TestApiService],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
