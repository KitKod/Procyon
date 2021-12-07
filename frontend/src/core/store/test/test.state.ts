import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { TestActions } from './test.actions';
import { TestModel } from './test.model';
import { TestApiService } from './test-api.service';

export interface TestStateModel {
    tests: TestModel[];
    testToEdit?: TestModel;
}

@State<TestStateModel>({
    name: 'test',
    defaults: {
        tests: [],
    },
})
@Injectable()
export class TestState {
    @Selector()
    static tests(state: TestStateModel): TestModel[] {
        return state.tests;
    }

    @Selector()
    static testToEdit(state: TestStateModel): TestModel | undefined {
        return state.testToEdit;
    }

    constructor(private api: TestApiService) {}

    @Action(TestActions.Add)
    add(ctx: StateContext<TestStateModel>, action: TestActions.Add): Observable<void> {
        return this.api.add(action.test).pipe(
            map(response => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: [merge(action.test, response.resource[0]), ...state.tests],
                });
            }),
        );
    }

    @Action(TestActions.Delete)
    delete(ctx: StateContext<TestStateModel>, action: TestActions.Delete): Observable<void> {
        return this.api.delete(action.test).pipe(
            map(() => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: state.tests.filter(({ id }) => id !== action.test.id),
                });
            }),
        );
    }

    @Action(TestActions.Update)
    update(ctx: StateContext<TestStateModel>, action: TestActions.Update): Observable<void> {
        return this.api.update(action.test).pipe(
            map(response => {
                const state = ctx.getState();
                ctx.patchState({
                    testToEdit:
                        state.testToEdit?.id === action.test.id
                            ? merge(state.testToEdit, action.test, response.resource[0])
                            : state.testToEdit,
                    tests: state.tests.map(test =>
                        test.id === action.test.id ? merge(test, action.test, response.resource[0]) : test,
                    ),
                });
            }),
        );
    }

    @Action(TestActions.GetById)
    getById(ctx: StateContext<TestStateModel>, action: TestActions.GetById): Observable<void> {
        return this.api.getById(action.testId).pipe(
            map(response => {
                ctx.patchState({
                    testToEdit: response.resource[0],
                });
            }),
        );
    }

    @Action(TestActions.FetchAll)
    fetchAll(ctx: StateContext<TestStateModel>): Observable<void> {
        return this.api.fetchAll().pipe(
            map(response => {
                ctx.patchState({ tests: response.resource });
            }),
        );
    }
}
