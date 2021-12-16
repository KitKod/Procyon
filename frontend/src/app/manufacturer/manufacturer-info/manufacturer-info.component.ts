import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { first, map, switchMapTo, takeUntil } from 'rxjs/operators';

import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { ManufacturerActions, ManufacturerState } from '@core/store/manufacturer';

@Component({
    selector: 'procyon-manufacturer-info',
    templateUrl: './manufacturer-info.component.html',
})
export class ManufacturerInfoComponent implements OnInit, OnDestroy {
    readonly manufactureForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        chief: ['', Validators.required],
        contact: ['', Validators.required],
    });

    readonly editModeEnabled$ = new BehaviorSubject(false);
    readonly viewModeEnabled$ = this.editModeEnabled$.pipe(map(v => !v));

    readonly destroy$ = new ReplaySubject<void>(1);

    get manufactureId(): number {
        return Number(this.activatedRoute.snapshot.params.id);
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private confirmSrv: ConfirmationDialogService,
        private fb: FormBuilder,
        private router: Router,
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.store
            .dispatch(new ManufacturerActions.GetById(this.manufactureId))
            .pipe(
                switchMapTo(this.store.select(ManufacturerState.manufacturerToEdit)),
                first(Boolean),
                takeUntil(this.destroy$),
            )
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

    updateManufacturer(): void {
        // TODO
    }

    deleteManufacturer(): void {
        this.confirmSrv.open({
            title: 'Підтвердьте видалення',
            message: `Ви впевнені, що хочете видалити виробника?`,
            affirmative: {
                label: 'Delete',
                handler: () => {
                    this.store.dispatch(new ManufacturerActions.Delete({ id: this.manufactureId }));
                    this.router.navigate(['/manufacturers']);
                },
            },
        });
    }

    private resetForm(): void {
        this.manufactureForm.reset(this.store.selectSnapshot(ManufacturerState.manufacturerToEdit) || {});
    }
}
