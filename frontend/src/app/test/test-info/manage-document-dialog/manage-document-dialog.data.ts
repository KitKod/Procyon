import { Type } from '@angular/core';
import { TestDocumentModel, TestDocumentActions } from '@core/store/test/document';

export interface ManageDocumentDialogData<T extends TestDocumentActions.Add | TestDocumentActions.Update> {
    action: Type<T>;
    testId: number;
    document?: TestDocumentModel;
}
