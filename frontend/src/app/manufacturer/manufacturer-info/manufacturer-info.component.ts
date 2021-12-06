import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

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

    readonly destroy$ = new ReplaySubject<void>(1);

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.manufactureForm.reset({
            name: 'Kiev army factory',
            address: 'Ukraine',
            chief: 'President',
            contact: 'Ukraine',
        });

        // this.store
        //     .dispatch(new ManufactureActions.GetById(this.activatedRoute.snapshot.params.id))
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe(() => {
        //         this.manufactureForm.reset(this.store.selectSnapshot(ManufactureState.manufactureToEdit) || {});
        //     });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
