import { TestOvtModel } from './test-ovt.model';

export namespace TestOvtActions {
    export class Add {
        static readonly type = '[TestOvt] Add';
        constructor(public test: Partial<TestOvtModel>) {}
    }
    export class Update {
        static readonly type = '[TestOvt] Update';
        constructor(public test: Pick<TestOvtModel, 'id'> & Partial<TestOvtModel>) {}
    }

    export class Delete {
        static readonly type = '[TestOvt] Delete';
        constructor(public id: number) {}
    }

    export class GetById {
        static readonly type = '[TestOvt] GetById';
        constructor(public id: number) {}
    }

    export class FetchAll {
        static readonly type = '[TestOvt] Fetch All';
    }
}
