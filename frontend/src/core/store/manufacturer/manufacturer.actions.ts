import { ManufacturerAddModel, ManufacturerDeleteModel, ManufacturerUpdateModel } from './manufacturer.model';

export namespace ManufacturerActions {
    export class Add {
        static readonly type = '[Manufacturer] Add';
        constructor(public manufacturer: ManufacturerAddModel) {}
    }
    export class Update {
        static readonly type = '[Manufacturer] Update';
        constructor(public manufacturer: ManufacturerUpdateModel) {}
    }

    export class Delete {
        static readonly type = '[Manufacturer] Delete';
        constructor(public manufacturer: ManufacturerDeleteModel) {}
    }

    export class GetById {
        static readonly type = '[Manufacturer] GetById';
        constructor(public manufacturerId: number) {}
    }

    export class FetchAll {
        static readonly type = '[Manufacturer] Fetch All';
    }
}
