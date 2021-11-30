import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { isEqual } from 'lodash-es';
import { switchMap, distinctUntilChanged, mapTo, tap } from 'rxjs/operators';
import { TestOvtModel, TestOvtState, TestOvtActions } from '../../store/test-ovt';

@Component({
    selector: 'procyon-test-ovt-list',
    templateUrl: './test-ovt-list.component.html',
    styleUrls: ['./test-ovt-list.component.scss'],
})
export class TestOvtListComponent implements OnInit {
    readonly dataSource$: Observable<MatTableDataSource<TestOvtModel>> = of(new MatTableDataSource()).pipe(
        switchMap(dataSource => {
            return this.store.select(TestOvtState.tests).pipe(
                tap(test => (dataSource.data = test)),
                mapTo(dataSource),
            );
        }),
        distinctUntilChanged(isEqual),
    );

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(TestOvtActions.FetchAll);
    }
}
