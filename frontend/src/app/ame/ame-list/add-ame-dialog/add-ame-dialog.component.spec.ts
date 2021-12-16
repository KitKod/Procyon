import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmeDialogComponent } from './add-ame-dialog.component';

describe('AddAmeDialogComponent', () => {
    let component: AddAmeDialogComponent;
    let fixture: ComponentFixture<AddAmeDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddAmeDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddAmeDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
