import { AmeModel, AmeCreateModel } from '../ame/ame.model';
import { WithoutId, PartialWithId, OnlyId } from '@core/utility-types';

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
    date_of_approval: string; // y-mm-dd
    status: TestStatus;
}

export interface TestModel extends TestBaseModel {
    ame: Pick<AmeModel, 'id' | 'name'>;
}

export type TestDocumentType = 'joint_decision' | 'separate_order' | 'order' | 'program' | 'method';

export type TestDocumentGovernment =
    | 'Ministry_of_Defence'
    | 'ZMO'
    | 'NGSH'
    | 'ZNGSH'
    | 'Director_of_DVTP_ROVT'
    | 'Chief_of_DNDІ_VS_OVT';

export type TestDocumentStatus = 'developing' | 'approving' | 'approved';

export interface TestDocumentModel {
    id: number;
    name?: string;
    type: TestDocumentType;
    status: TestDocumentStatus;
    government: TestDocumentGovernment;
    date_of_approval: string;
    material_and_technical_means: string;
}

export interface TestModelExtended extends TestModel {
    documents: TestDocumentModel[];
}

// Test manage models
export type TestAddModel = WithoutId<TestBaseModel> & { ame: AmeCreateModel };
export type TestUpdateModel = PartialWithId<TestBaseModel> & { ame?: OnlyId<AmeModel> };
export type TestDeleteModel = OnlyId<TestBaseModel>;

// Test document manage models
export type DocumentAddModel = WithoutId<TestDocumentModel & { file?: File }, 'name'>;
export type DocumentUpdateModel = OnlyId<TestDocumentModel> & Partial<DocumentAddModel>;
export type DocumentDeleteModel = OnlyId<TestDocumentModel>;
