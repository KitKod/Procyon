import { TestAddModel, TestUpdateModel, TestDeleteModel } from './test.model';

export namespace TestActions {
    export class Add {
        static readonly type = '[Test] Add';
        constructor(public test: TestAddModel) {}
    }
    export class Update {
        static readonly type = '[Test] Update';
        constructor(public test: TestUpdateModel) {}
    }

    export class Delete {
        static readonly type = '[Test] Delete';
        constructor(public test: TestDeleteModel) {}
    }

    export class GetById {
        static readonly type = '[Test] GetById';
        constructor(public testId: number) {}
    }

    export class FetchAll {
        static readonly type = '[Test] Fetch All';
    }
}
