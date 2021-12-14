import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil, first, switchMap, switchMapTo, filter, map } from 'rxjs/operators';
import { TestActions } from '@core/store/test';
import { ConfirmationDialogService } from '@core/confirmation-dialog';
import { ManufacturerActions, ManufacturerState, ManufacturerModel } from '@core/store/manufacturer';

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
        this.confirmSrv.open({
            title: 'Confirm deletion',
            message: `Are you sure you want to delete the manufacturer?`,
            affirmative: {
                label: 'Delete',
                handler: () => {
                    this.store.dispatch(new ManufacturerActions.Delete({ id: this.manufactureId }));
                    this.router.navigate(['/manufacturers']);
                },
            },
        });
    }

    deleteManufacturer(): void {
        this.confirmSrv.open({
            title: 'Confirm deletion',
            message: `Are you sure you want to delete the manufacturer?`,
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
