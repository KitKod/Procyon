import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { first, map, switchMapTo, takeUntil } from 'rxjs/operators';

import { AME_FAMILIES } from '@core/constants/ame-constants';
import { AmeActions, AmeModel, AmeState } from '@core/store/ame';
import { getDirtyValues } from '@core/utils/form';
import { getAmeFamilyLocalization } from '@core/utils/localization';

@Component({
    selector: 'procyon-ame-info',
    templateUrl: './ame-info.component.html',
})
export class AmeInfoComponent implements OnInit, OnDestroy {
    readonly ameForm = this.fb.group({
        name: ['', Validators.required],
        family: ['', Validators.required],
        type: ['', Validators.required],
        ttc_file: [null, Validators.required],
        manufacturer: [null, Validators.required],
    });

    readonly ame$ = this.store.select(AmeState.ameToEdit);

    readonly ameFamilies = AME_FAMILIES;

    readonly getAmeFamily = getAmeFamilyLocalization;

    readonly editModeEnabled$ = new BehaviorSubject(false);
    readonly viewModeEnabled$ = this.editModeEnabled$.pipe(map(v => !v));

    readonly destroy$ = new ReplaySubject<void>(1);

    get ameId(): number {
        return Number(this.activatedRoute.snapshot.params.id);
    }

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.store
            .dispatch(new AmeActions.GetById(this.ameId))
            .pipe(switchMapTo(this.store.select(AmeState.ameToEdit)), first(Boolean), takeUntil(this.destroy$))
            .subscribe(() => this.resetForm());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    enableEditMode(): void {
        this.editModeEnabled$.next(true);
    }

    cancelEdit(): void {
        this.editModeEnabled$.next(false);
        this.resetForm();
    }

    saveAme(): void {
        const { manufacturer: manufacturer_id, ...updatedInfo } = getDirtyValues(this.ameForm);

        this.store
            .dispatch(
                new AmeActions.Update({
                    id: this.ameId,
                    ...updatedInfo,
                    ...(manufacturer_id && { manufacturer_id }),
                }),
            )
            .subscribe(() => {
                this.editModeEnabled$.next(false);
                this.resetForm();
            });
    }

    asAmeModelKey(v: unknown): keyof AmeModel {
        return v as keyof AmeModel;
    }

    updateFile(event: Event): void {
        const control: FormControl = this.ameForm.get('ttc_file') as FormControl;
        const newFile = (event.target as HTMLInputElement).files?.[0];
        if (newFile) {
            control.setValue(newFile);
            control.markAsDirty();
        }
    }

    private resetForm(): void {
        const { manufacturer, ttc_file_name } = this.store.selectSnapshot(AmeState.ameToEdit) || {};

        this.ameForm.reset({
            name: 'Fort PM',
            family: 'armored_vehicles',
            type: 'warhfdf hadsfhadha',
            ttc_file: new File([''], ttc_file_name as string),
            manufacturer: manufacturer?.id,
        });
    }
}
