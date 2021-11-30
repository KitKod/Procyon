import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOvtListComponent } from './test-ovt-list.component';

describe('TestOvtListComponent', () => {
    let component: TestOvtListComponent;
    let fixture: ComponentFixture<TestOvtListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestOvtListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestOvtListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
