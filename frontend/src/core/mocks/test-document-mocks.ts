import { TestDocumentModel } from '@core/store/test/document/document.model';

export const testDocumentMocks: TestDocumentModel[] = [
    {
        id: 1,
        name: 'document-order-for-test.doc',
        type: 'order',
        status: 'approved',
        government: 'Ministry_of_Defence',
        date_of_approval: '11-11-2021',
        material_and_technical_means: 'sadhsahjsahsfah\nasfjasdjasjsaffj\n\n\nad',
    },
    {
        id: 2,
        name: 'separate-order-test-124.doc',
        type: 'separate_order',
        status: 'developing',
        government: 'ZMO',
        date_of_approval: '',
        material_and_technical_means: '',
    },
    {
        id: 3,
        name: 'joint_decision.doc',
        type: 'joint_decision',
        status: 'developing',
        government: 'ZNGSH',
        date_of_approval: '',
        material_and_technical_means: '',
    },
    {
        id: 4,
        name: 'program-for-test.pdf',
        type: 'program',
        status: 'approving',
        government: 'Chief_of_DNDІ_VS_OVT',
        date_of_approval: '',
        material_and_technical_means: '',
    },
    {
        id: 5,
        name: 'method-for-testing-1.doc',
        type: 'method',
        status: 'approved',
        government: 'Chief_of_DNDІ_VS_OVT',
        date_of_approval: '12-11-2021',
        material_and_technical_means: '',
    },
    {
        id: 6,
        name: 'method-for-testing-3.doc',
        type: 'method',
        status: 'approving',
        government: 'ZNGSH',
        date_of_approval: '',
        material_and_technical_means: '',
    },
    {
        id: 7,
        name: '',
        type: 'method',
        status: 'developing',
        government: 'ZNGSH',
        date_of_approval: '',
        material_and_technical_means: '',
    },
];

export const testDocumentBlob: Blob = new Blob(['Test Document Blob Mock']);
