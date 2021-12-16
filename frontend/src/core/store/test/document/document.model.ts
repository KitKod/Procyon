import { OnlyId, WithoutId } from '@core/utility-types';

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
    name: string;
    type: TestDocumentType;
    status: TestDocumentStatus;
    government: TestDocumentGovernment;
    date_of_approval: string;
    material_and_technical_means: string;
}

export type DocumentAddModel = WithoutId<TestDocumentModel & { document_file?: File }, 'name'>;
export type DocumentUpdateModel = OnlyId<TestDocumentModel> & Partial<DocumentAddModel>;
export type DocumentDeleteModel = OnlyId<TestDocumentModel>;
