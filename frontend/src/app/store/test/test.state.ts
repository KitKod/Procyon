import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TestActions } from './test.actions';
import { TestModel } from './test.model';
import { TestApiService } from './test-api.service';

export interface TestStateModel {
    tests: TestModel[];
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

    constructor(private api: TestApiService) {}

    /**
     * Simple Example
     */
    @Action(TestActions.Add)
    add(ctx: StateContext<TestStateModel>, action: TestActions.Add): Observable<void> {
        return this.api.add(action.test).pipe(
            map(test => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: [...state.tests, test],
                });
            }),
        );
    }

    @Action(TestActions.Delete)
    delete(ctx: StateContext<TestStateModel>, action: TestActions.Delete): Observable<void> {
        return this.api.delete(action.id).pipe(
            map(() => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: state.tests.filter(({ id }) => id !== action.id),
                });
            }),
        );
    }

    @Action(TestActions.Update)
    update(ctx: StateContext<TestStateModel>, action: TestActions.Update): Observable<void> {
        return this.api.update(action.test).pipe(
            map(updatedTest => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: state.tests.map(test => (test.id === action.test.id ? updatedTest : test)),
                });
            }),
        );
    }

    @Action(TestActions.FetchAll)
    fetchAll(ctx: StateContext<TestStateModel>, action: TestActions.FetchAll): Observable<void> {
        return this.api.fetchAll().pipe(
            map(tests => {
                ctx.patchState({ tests });
            }),
        );
    }
}
