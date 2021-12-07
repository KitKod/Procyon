import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { AmeActions } from './ame.actions';
import { AmeModel } from './ame.model';
import { AmeApiService } from './ame-api.service';

export interface AmeStateModel {
    ames: AmeModel[];
    ameToEdit?: AmeModel;
}

@State<AmeStateModel>({
    name: 'ame',
    defaults: {
        ames: [],
    },
})
@Injectable()
export class AmeState {
    @Selector()
    static ames(state: AmeStateModel): AmeModel[] {
        return state.ames;
    }

    @Selector()
    static ameToEdit(state: AmeStateModel): AmeModel | undefined {
        return state.ameToEdit;
    }

    constructor(private api: AmeApiService) {}

    @Action(AmeActions.Add)
    add(ctx: StateContext<AmeStateModel>, action: AmeActions.Add): Observable<void> {
        return this.api.add(action.ame).pipe(
            map(response => {
                const state = ctx.getState();
                ctx.patchState({
                    ames: [merge(action.ame, response.resource[0]), ...state.ames],
                });
            }),
        );
    }

    @Action(AmeActions.Delete)
    delete(ctx: StateContext<AmeStateModel>, action: AmeActions.Delete): Observable<void> {
        return this.api.delete(action.ame).pipe(
            map(() => {
                const state = ctx.getState();
                ctx.patchState({
                    ames: state.ames.filter(({ id }) => id !== action.ame.id),
                });
            }),
        );
    }

    @Action(AmeActions.Update)
    update(ctx: StateContext<AmeStateModel>, action: AmeActions.Update): Observable<void> {
        return this.api.update(action.ame).pipe(
            map(response => {
                const state = ctx.getState();
                ctx.patchState({
                    ameToEdit:
                        state.ameToEdit?.id === action.ame.id
                            ? merge(state.ameToEdit, action.ame, response.resource[0])
                            : state.ameToEdit,
                    ames: state.ames.map(ame =>
                        ame.id === action.ame.id ? (merge(ame, action.ame, response.resource[0]) as AmeModel) : ame,
                    ),
                });
            }),
        );
    }

    @Action(AmeActions.GetById)
    getById(ctx: StateContext<AmeStateModel>, action: AmeActions.GetById): Observable<void> {
        return this.api.getById(action.ameId).pipe(
            map(response => {
                ctx.patchState({
                    ameToEdit: response.resource[0],
                });
            }),
        );
    }

    @Action(AmeActions.FetchAll)
    fetchAll(ctx: StateContext<AmeStateModel>): Observable<void> {
        return this.api.fetchAll().pipe(
            map(response => {
                ctx.patchState({ ames: response.resource });
            }),
        );
    }
}
