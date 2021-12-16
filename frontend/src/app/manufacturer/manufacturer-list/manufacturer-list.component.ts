import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { isEqual } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, mapTo, switchMap, tap } from 'rxjs/operators';

import { ManufacturerActions, ManufacturerModel, ManufacturerState } from '@core/store/manufacturer';

import { AddManufacturerDialogComponent } from './add-manufacturer-dialog/add-manufacturer-dialog.component';

@Component({
    selector: 'procyon-manufacturer-list',
    templateUrl: './manufacturer-list.component.html',
    styleUrls: ['./manufacturer-list.component.scss'],
})
export class ManufacturerListComponent implements OnInit {
    readonly dataSource$: Observable<MatTableDataSource<ManufacturerModel>> = of(new MatTableDataSource()).pipe(
        switchMap(dataSource => {
            return this.store.select(ManufacturerState.manufacturers).pipe(
                tap(manufacturer => (dataSource.data = manufacturer)),
                mapTo(dataSource),
            );
        }),
        distinctUntilChanged(isEqual),
    );

    constructor(private store: Store, private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.store.dispatch(ManufacturerActions.FetchAll);
    }

    openAddManufacturerDialog(): void {
        this.matDialog
            .open<AddManufacturerDialogComponent>(AddManufacturerDialogComponent)
            .afterClosed()
            .subscribe(result => {
                console.log('openAddManufactureDialog', { result });
            });
    }
}
