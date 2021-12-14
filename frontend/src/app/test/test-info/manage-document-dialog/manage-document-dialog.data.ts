import { TestDocumentModel, TestDocumentType } from '@core/store/test/document';
import { WithoutId } from '@core/utility-types';

export interface ManageDocumentDialogData {
    title: string;
    prefilledData?: Partial<TestDocumentModel>;
    availableTypes: TestDocumentType[];
    canUploadFile?: boolean;
    onSaveCallback: (document: WithoutId<TestDocumentModel>) => void;
}
