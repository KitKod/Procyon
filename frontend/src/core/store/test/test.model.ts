import { AmeModel, AmeCreateModel } from '../ame/ame.model';
import { WithoutId, PartialWithId, OnlyId } from '@core/utility-types';
import { TestType } from '@core/store/test/test.constants';

export type TestStatus = 'preparation' | 'testing' | 'paused' | 'continued' | 'finished';

export interface TestBaseModel {
    id: number;
    name: string;
    type: TestType;
    location: string;
    date: string; // y-mm-dd
    status: TestStatus;
}

export interface TestModel extends TestBaseModel {
    ame: Pick<AmeModel, 'id' | 'name'>;
}

// export enum DocumentType {
//     JointDecision = 'joint_decision',
//     SeparateOrder = 'separate_order',
//     Order = 'order',
//     Program = 'program',
//     Method = 'method',
// }

export type TestDocumentType = 'joint_decision' | 'separate_order' | 'order' | 'program' | 'method';

// export enum DocumentStatus {
//     Developing = 'developing',
//     Approving = 'approving',
//     Approved = 'approved',
// }
export type TestDocumentStatus = 'developing' | 'approving' | 'approved';

export interface TestDocumentModel {
    id: number;
    name: string;
    type: TestDocumentType;
    status: TestDocumentStatus;
    government: string;
    date_of_approval: string;
    material_and_technical_means: string;
    file_index: string;
}

export interface TestModelExtended extends TestModel {
    documents: TestDocumentModel[];
}

export interface TestAddModel extends WithoutId<TestBaseModel> {
    ame: AmeCreateModel;
}

export interface TestUpdateModel extends PartialWithId<TestBaseModel> {
    ame?: OnlyId<AmeModel>;
}

export type TestDeleteModel = OnlyId<TestBaseModel>;
