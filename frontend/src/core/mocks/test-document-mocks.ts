import { TestDocumentModel } from '@core/store/test/document/document.model';

export const testDocumentMocks: TestDocumentModel[] = [
    {
        id: 1,
        name: 'Наказ.doc',
        type: 'order',
        status: 'approved',
        government: 'Ministry_of_Defence',
        date_of_approval: '11-11-2021',
        material_and_technical_means: '',
    },
    {
        id: 2,
        name: 'Окреме доручення.doc',
        type: 'separate_order',
        status: 'approved',
        government: 'Ministry_of_Defence',
        date_of_approval: '11-11-2021',
        material_and_technical_means: '',
    },
    {
        id: 3,
        name: 'Спільне рішення.doc',
        type: 'joint_decision',
        status: 'approved',
        government: 'Ministry_of_Defence',
        date_of_approval: '11-11-2021',
        material_and_technical_means: '',
    },
    {
        id: 4,
        name: 'Програма випробувань.doc',
        type: 'program',
        status: 'approving',
        government: 'Ministry_of_Defence',
        date_of_approval: '',
        material_and_technical_means: '',
    },
    {
        id: 5,
        name: 'Методики випробувань.doc',
        type: 'method',
        status: 'developing',
        government: 'Ministry_of_Defence',
        date_of_approval: '12-11-2021',
        material_and_technical_means: '',
    },
];

export const testDocumentBlob: Blob = new Blob(['Test Document Blob Mock']);
