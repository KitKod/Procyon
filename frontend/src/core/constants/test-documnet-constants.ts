import { TestDocumentGovernment, TestDocumentType } from '@core/store/test/document';

export const DOCUMENTS_GROUPS_BY_TYPE: Record<'document' | 'program' | 'method', TestDocumentType[]> = {
    document: ['order', 'separate_order', 'joint_decision'],
    program: ['program'],
    method: ['method'],
};

export const DOCUMENT_GOVERNMENTS: TestDocumentGovernment[] = [
    'Ministry_of_Defence',
    'ZMO',
    'NGSH',
    'ZNGSH',
    'Director_of_DVTP_ROVT',
    'Chief_of_DNDІ_VS_OVT',
];
