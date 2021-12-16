import { OnlyId, PartialWithId, WithoutId } from '@core/utility-types';

import { AmeAddModel, AmeModel } from '../ame/ame.model';

export type TestStatus = 'preparation' | 'testing' | 'paused' | 'continued' | 'finished';

export type TestType =
    | 'preliminary'
    | 'state'
    | 'interdepartmental'
    | 'defining'
    | 'departmental'
    | 'research'
    | 'control'
    | 'special';

export interface TestBaseModel {
    id: number;
    name: string;
    type: TestType;
    location: string;
    date_of_approval: string;
    status: TestStatus;
}

export interface TestModel extends TestBaseModel {
    ame: Pick<AmeModel, 'id' | 'name'>;
}

// Test manage models
export type TestAddModel = WithoutId<TestBaseModel> & { ame: AmeAddModel };
export type TestUpdateModel = PartialWithId<TestBaseModel> & { ame?: OnlyId<AmeModel> };
export type TestDeleteModel = OnlyId<TestBaseModel>;
