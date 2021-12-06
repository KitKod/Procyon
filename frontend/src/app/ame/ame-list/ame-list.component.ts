import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { isEqual } from 'lodash-es';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddAmeDialogComponent } from './add-ame-dialog/add-ame-dialog.component';
import { AmeModel } from '@core/store/ame';

@Component({
    selector: 'procyon-ame-list',
    templateUrl: './ame-list.component.html',
    styleUrls: ['./ame-list.component.scss'],
})
export class AmeListComponent implements OnInit {
    readonly dataSource$: Observable<MatTableDataSource<AmeModel>> = of(new MatTableDataSource()).pipe(
        tap(dataSource => {
            dataSource.data = [
                {
                    id: 1,
                    name: 'Object 168',
                    family: 'armored_vehicles',
                    type: 'warhfdf hadsfhadha',
                    manufacturer: {
                        name: 'Kiev army factory',
                        address: 'Ukraine',
                        chief: 'President',
                        contact: 'Ukraine',
                    },
                },
                {
                    id: 2,
                    name: 'helicopter mi-666',
                    family: 'armored_vehicles',
                    type: 'human',
                    manufacturer: {
                        name: 'Kiev army factory',
                        address: 'Ukraine',
                        chief: 'President',
                        contact: 'Ukraine',
                    },
                },
                {
                    id: 3,
                    name: 'Human with wings',
                    family: 'armored_vehicles',
                    type: 'human',
                    manufacturer: {
                        name: 'Ukrainians',
                        address: 'Ukraine',
                        chief: 'President',
                        contact: 'Ukraine',
                    },
                },
                {
                    id: 4,
                    name: 'Jetpack v228',
                    family: 'armored_vehicles',
                    type: 'warhfdf hadsfhadha',
                    manufacturer: {
                        name: 'Kiev army factory',
                        address: 'Ukraine',
                        chief: 'President',
                        contact: 'Ukraine',
                    },
                },
                {
                    id: 5,
                    name: 'Fort PM',
                    family: 'armored_vehicles',
                    type: 'warhfdf hadsfhadha',
                    manufacturer: {
                        name: 'Kiev army factory',
                        address: 'Ukraine',
                        chief: 'President',
                        contact: 'Ukraine',
                    },
                },
            ];
        }),
        // switchMap(dataSource => {
        //     return this.store.select(AmeState.ames).pipe(
        //         tap(ame => (dataSource.data = ame)),
        //         mapTo(dataSource),
        //     );
        // }),
        distinctUntilChanged(isEqual),
    );

    constructor(private store: Store, private matDialog: MatDialog) {}

    ngOnInit(): void {
        // this.store.dispatch(AmeActions.FetchAll);
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
