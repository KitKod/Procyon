import { AmeAddModel, AmeDeleteModel, AmeUpdateModel } from './ame.model';

export namespace AmeActions {
    export class Add {
        static readonly type = '[Ame] Add';
        constructor(public ame: AmeAddModel) {}
    }
    export class Update {
        static readonly type = '[Ame] Update';
        constructor(public ame: AmeUpdateModel) {}
    }

    export class Delete {
        static readonly type = '[Ame] Delete';
        constructor(public ame: AmeDeleteModel) {}
    }

    export class GetById {
        static readonly type = '[Ame] GetById';
        constructor(public ameId: number) {}
    }

    export class FetchAll {
        static readonly type = '[Ame] Fetch All';
    }
}
