import { TestModel } from './test.model';

export namespace TestActions {
    export class Add {
        static readonly type = '[Test] Add';
        constructor(public test: Partial<TestModel>) {}
    }
    export class Update {
        static readonly type = '[Test] Update';
        constructor(public test: Pick<TestModel, 'id'> & Partial<TestModel>) {}
    }

    export class Delete {
        static readonly type = '[Test] Delete';
        constructor(public id: number) {}
    }

    export class GetById {
        static readonly type = '[Test] GetById';
        constructor(public id: number) {}
    }

    export class FetchAll {
        static readonly type = '[Test] Fetch All';
    }
}
