import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

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
        manufacturer: this.fb.group({
            id: [0, Validators.required],
            name: [0, Validators.required],
        }),
    });

    readonly destroy$ = new ReplaySubject<void>(1);

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.ameForm.reset({
            name: 'Fort PM',
            family: 'armored_vehicles',
            type: 'warhfdf hadsfhadha',
            manufacturer: {
                name: 'Kiev army factory',
                address: 'Ukraine',
                chief: 'President',
                contact: 'Ukraine',
            },
        });

        // this.store
        //     .dispatch(new AmeActions.GetById(this.activatedRoute.snapshot.params.id))
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe(() => {
        //         this.ameForm.reset(this.store.selectSnapshot(AmeState.ameToEdit) || {});
        //     });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
