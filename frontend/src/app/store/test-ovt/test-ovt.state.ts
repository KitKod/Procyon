import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TestOvtActions } from './test-ovt.actions';
import { TestOvtModel } from './test-ovt.model';
import { TestOvtApiService } from './test-ovt-api.service';

export interface TestOvtStateModel {
    tests: TestOvtModel[];
}

@State<TestOvtStateModel>({
    name: 'testOvt',
    defaults: {
        tests: [],
    },
})
@Injectable()
export class TestOvtState {
    @Selector()
    static tests(state: TestOvtStateModel): TestOvtModel[] {
        return state.tests;
    }

    constructor(private api: TestOvtApiService) {}

    /**
     * Simple Example
     */
    @Action(TestOvtActions.Add)
    add(ctx: StateContext<TestOvtStateModel>, action: TestOvtActions.Add): Observable<void> {
        return this.api.add(action.test).pipe(
            map(test => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: [...state.tests, test],
                });
            }),
        );
    }

    @Action(TestOvtActions.Delete)
    delete(ctx: StateContext<TestOvtStateModel>, action: TestOvtActions.Delete): Observable<void> {
        return this.api.delete(action.id).pipe(
            map(() => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: state.tests.filter(({ id }) => id !== action.id),
                });
            }),
        );
    }

    @Action(TestOvtActions.Update)
    update(ctx: StateContext<TestOvtStateModel>, action: TestOvtActions.Update): Observable<void> {
        return this.api.update(action.test).pipe(
            map(updatedTest => {
                const state = ctx.getState();
                ctx.patchState({
                    tests: state.tests.map(test => (test.id === action.test.id ? updatedTest : test)),
                });
            }),
        );
    }

    @Action(TestOvtActions.FetchAll)
    fetchAll(ctx: StateContext<TestOvtStateModel>, action: TestOvtActions.FetchAll): Observable<void> {
        return this.api.fetchAll().pipe(
            map(tests => {
                ctx.patchState({ tests });
            }),
        );
    }
}
