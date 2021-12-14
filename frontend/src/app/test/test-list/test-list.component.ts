import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { isEqual } from 'lodash-es';
import { switchMap, distinctUntilChanged, mapTo, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AddTestDialogComponent } from './add-test-dialog/add-test-dialog.component';
import { TestModel, TestState, TestActions } from '@core/store/test';

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
