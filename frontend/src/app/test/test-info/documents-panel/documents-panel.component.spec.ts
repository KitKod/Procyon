import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsPanelComponent } from './documents-panel.component';

describe('DocumentsPanelComponent', () => {
    let component: DocumentsPanelComponent;
    let fixture: ComponentFixture<DocumentsPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DocumentsPanelComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentsPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
