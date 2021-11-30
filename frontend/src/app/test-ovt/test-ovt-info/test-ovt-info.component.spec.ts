import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOvtInfoComponent } from './test-ovt-info.component';

describe('TestOvtInfoComponent', () => {
    let component: TestOvtInfoComponent;
    let fixture: ComponentFixture<TestOvtInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestOvtInfoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestOvtInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
