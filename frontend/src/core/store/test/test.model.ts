import { AmeModel, AmeCreateModel } from '../ame/ame.model';
import { WithoutId, PartialWithId, OnlyId } from '@core/utility-types';

export enum TestStatus {
    Preparation = 'preparation',
    Testing = 'testing',
    Paused = 'paused',
    Continued = 'continued',
    Finished = 'finished',
}

export enum TestType {
    Preliminary = 'preliminary',
    State = 'state',
    Interdepartmental = 'interdepartmental',
    Defining = 'defining',
    Departmental = 'departmental',
    Research = 'research',
    Control = 'control',
    Special = 'special',
}

export interface TestBaseModel {
    id: number;
    name: string;
    type: TestType;
    location: string;
    date: string;
    status: TestStatus; // TODO Add status type
}

export interface TestModel extends TestBaseModel {
    ame: Pick<AmeModel, 'id' | 'name'>;
}

export interface TestModelExtended extends TestModel {
    // TODO move to documents model
    documents: {
        id: number;
        name: string;
        type: string; // enum for doc type: 'doc_1,doc_2,doc_3,program,metodicat',
        status: string; // enum for status type
        government: string; // enum for government type
        date_of_approval: string;
        material_and_technical_means: string;
        file_index: string;
    }[];
}

export interface TestAddModel extends WithoutId<TestBaseModel> {
    ame: AmeCreateModel;
}

export interface TestUpdateModel extends PartialWithId<TestBaseModel> {
    ame?: OnlyId<AmeModel>;
}

export type TestDeleteModel = OnlyId<TestBaseModel>;
