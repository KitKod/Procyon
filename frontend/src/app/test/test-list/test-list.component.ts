import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { isEqual } from 'lodash-es';
import { switchMap, distinctUntilChanged, mapTo, tap } from 'rxjs/operators';
import { TestModel, TestState, TestActions } from '../../store/test';

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

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(TestActions.FetchAll);
    }
}
