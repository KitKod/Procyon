import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTestDialogComponent } from './add-test-dialog.component';

describe('AddTestWizardComponent', () => {
    let component: AddTestDialogComponent;
    let fixture: ComponentFixture<AddTestDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddTestDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTestDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
