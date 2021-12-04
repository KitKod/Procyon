import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { TestActions, TestState } from '@core/store/test';
import { TestDocumentType } from '@core/store/test/test.model';

function createDocumentForm(fb: FormBuilder): FormGroup {
    return fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        type: ['', Validators.required],
        status: ['', Validators.required],
        government: ['', Validators.required],
        date_of_approval: ['', Validators.required],
        material_and_technical_means: ['', Validators.required],
        file_index: ['', Validators.required],
    });
}
@Component({
    selector: 'procyon-test-info',
    templateUrl: './test-info.component.html',
    styleUrls: ['./test-info.component.scss'],
})
export class TestInfoComponent implements OnInit, OnDestroy {
    readonly testForm = this.fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        type: ['', Validators.required],
        location: ['', Validators.required],
        date: ['', Validators.required],
        status: ['', Validators.required],
        ame: this.fb.group({
            id: [0, Validators.required],
            name: [0, Validators.required],
        }),
        documents: this.fb.array([]),
    });

    readonly destroy$ = new ReplaySubject<void>(1);

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.store
            .dispatch(new TestActions.GetById(this.activatedRoute.snapshot.params.id))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.testForm.reset(this.store.selectSnapshot(TestState.testToEdit) || {});
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addDocument(type: TestDocumentType): void {}
}
