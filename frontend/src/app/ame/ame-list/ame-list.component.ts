import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { isEqual } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, mapTo, switchMap, tap } from 'rxjs/operators';

import { AmeActions, AmeModel, AmeState } from '@core/store/ame';
import { getAmeFamilyLocalization } from '@core/utils/localization';

import { AddAmeDialogComponent } from './add-ame-dialog/add-ame-dialog.component';

@Component({
    selector: 'procyon-ame-list',
    templateUrl: './ame-list.component.html',
    styleUrls: ['./ame-list.component.scss'],
})
export class AmeListComponent implements OnInit {
    readonly dataSource$: Observable<MatTableDataSource<AmeModel>> = of(new MatTableDataSource()).pipe(
        switchMap(dataSource =>
            this.store.select(AmeState.ames).pipe(
                tap(ame => (dataSource.data = ame)),
                mapTo(dataSource),
            ),
        ),
        distinctUntilChanged(isEqual),
    );

    readonly getAmeFamily = getAmeFamilyLocalization;

    constructor(private store: Store, private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.store.dispatch(AmeActions.FetchAll);
    }

    openAddAmeDialog(): void {
        this.matDialog
            .open<AddAmeDialogComponent>(AddAmeDialogComponent)
            .afterClosed()
            .subscribe(result => {
                console.log('openAddAmeDialog', { result });
            });
    }
}
