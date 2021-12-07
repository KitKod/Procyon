import { TestDocumentType } from '@core/store/test/document';

export const DOCUMENTS_GROUPS_BY_TYPE: Record<'document' | 'program' | 'method', TestDocumentType[]> = {
    document: ['order', 'separate_order', 'joint_decision'],
    program: ['program'],
    method: ['method'],
};
