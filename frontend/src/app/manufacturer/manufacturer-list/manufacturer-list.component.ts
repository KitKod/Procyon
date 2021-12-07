import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { isEqual } from 'lodash-es';
import { distinctUntilChanged, tap, switchMap, mapTo } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddManufacturerDialogComponent } from './add-manufacturer-dialog/add-manufacturer-dialog.component';
import { ManufacturerModel, ManufacturerState, ManufacturerActions } from '@core/store/manufacturer';

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
