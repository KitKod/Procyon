import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentDialogComponent } from './manage-document-dialog.component';

describe('ManageDocumentDialogComponent', () => {
    let component: ManageDocumentDialogComponent;
    let fixture: ComponentFixture<ManageDocumentDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ManageDocumentDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageDocumentDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
