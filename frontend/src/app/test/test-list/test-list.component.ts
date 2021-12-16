import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { isEqual } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, mapTo, switchMap, tap } from 'rxjs/operators';

import { TestActions, TestModel, TestState } from '@core/store/test';
import { getTestStatusLocalization, getTestTypeLocalization } from '@core/utils/localization';

import { AddTestDialogComponent } from './add-test-dialog/add-test-dialog.component';

@Component({
    selector: 'procyon-test-list',
    templateUrl: './test-list.component.html',
    styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {
    readonly dataSource$: Observable<MatTableDataSource<TestModel>> = of(new MatTableDataSource()).pipe(
        switchMap(dataSource => {
            return this.store.select(TestState.tests).pipe(
                tap(test => (dataSource.data = test)),
                mapTo(dataSource),
            );
        }),
        distinctUntilChanged(isEqual),
    );

    readonly getTestType = getTestTypeLocalization;
    readonly getTestStatus = getTestStatusLocalization;

    constructor(
        private store: Store,
        private matDialog: MatDialog,
        private activationRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.store.dispatch(TestActions.FetchAll);
    }

    openAddTestDialog(): void {
        this.matDialog
            .open<AddTestDialogComponent>(AddTestDialogComponent)
            .afterClosed()
            .subscribe(result => {
                console.log('openAddTestDialog', result.test.tests[0]);
                this.router.navigate([result.test.tests[0].id], { relativeTo: this.activationRoute });
            });
    }
}
