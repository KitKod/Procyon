import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { ManufacturerActions } from './manufacturer.actions';
import { ManufacturerModel } from './manufacturer.model';
import { ManufacturerApiService } from './manufacturer-api.service';

export interface ManufacturerStateModel {
    manufacturers: ManufacturerModel[];
    manufacturerToEdit?: ManufacturerModel;
}

@State<ManufacturerStateModel>({
    name: 'manufacturer',
    defaults: {
        manufacturers: [],
    },
})
@Injectable()
export class ManufacturerState {
    @Selector()
    static manufacturers(state: ManufacturerStateModel): ManufacturerModel[] {
        return state.manufacturers;
    }

    @Selector()
    static manufacturerToEdit(state: ManufacturerStateModel): ManufacturerModel | undefined {
        return state.manufacturerToEdit;
    }

    constructor(private api: ManufacturerApiService) {}

    @Action(ManufacturerActions.Add)
    add(ctx: StateContext<ManufacturerStateModel>, action: ManufacturerActions.Add): Observable<void> {
        return this.api.add(action.manufacturer).pipe(
            map(response => {
                const state = ctx.getState();
                ctx.patchState({
                    manufacturers: [merge(action.manufacturer, response.resource[0]), ...state.manufacturers],
                });
            }),
        );
    }

    @Action(ManufacturerActions.Delete)
    delete(ctx: StateContext<ManufacturerStateModel>, action: ManufacturerActions.Delete): Observable<void> {
        return this.api.delete(action.manufacturer).pipe(
            map(() => {
                const state = ctx.getState();
                ctx.patchState({
                    manufacturers: state.manufacturers.filter(({ id }) => id !== action.manufacturer.id),
                });
            }),
        );
    }

    @Action(ManufacturerActions.Update)
    update(ctx: StateContext<ManufacturerStateModel>, action: ManufacturerActions.Update): Observable<void> {
        return this.api.update(action.manufacturer).pipe(
            map(response => {
                const state = ctx.getState();
                ctx.patchState({
                    manufacturerToEdit:
                        state.manufacturerToEdit?.id === action.manufacturer.id
                            ? merge(state.manufacturerToEdit, action.manufacturer, response.resource[0])
                            : state.manufacturerToEdit,
                    manufacturers: state.manufacturers.map(manufacturer =>
                        manufacturer.id === action.manufacturer.id
                            ? merge(manufacturer, action.manufacturer, response.resource[0])
                            : manufacturer,
                    ),
                });
            }),
        );
    }

    @Action(ManufacturerActions.GetById)
    getById(ctx: StateContext<ManufacturerStateModel>, action: ManufacturerActions.GetById): Observable<void> {
        return this.api.getById(action.manufacturerId).pipe(
            map(response => {
                ctx.patchState({
                    manufacturerToEdit: response.resource[0],
                });
            }),
        );
    }

    @Action(ManufacturerActions.FetchAll)
    fetchAll(ctx: StateContext<ManufacturerStateModel>): Observable<void> {
        return this.api.fetchAll().pipe(
            map(response => {
                ctx.patchState({ manufacturers: response.resource });
            }),
        );
    }
}
