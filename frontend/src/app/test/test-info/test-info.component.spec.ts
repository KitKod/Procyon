import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestInfoComponent } from './test-info.component';

describe('TestInfoComponent', () => {
    let component: TestInfoComponent;
    let fixture: ComponentFixture<TestInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestInfoComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
