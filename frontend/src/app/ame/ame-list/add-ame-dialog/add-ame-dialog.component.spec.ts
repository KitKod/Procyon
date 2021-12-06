import { ComponentFixture, AmeBed } from '@angular/core/ameing';
import { AddAmeDialogComponent } from './add-ame-dialog.component';

describe('AddAmeWizardComponent', () => {
    let component: AddAmeDialogComponent;
    let fixture: ComponentFixture<AddAmeDialogComponent>;

    beforeEach(async () => {
        await AmeBed.configureAmeingModule({
            declarations: [AddAmeDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = AmeBed.createComponent(AddAmeDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
