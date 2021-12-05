import { Type } from '@angular/core';
import { TestDocumentModel } from '@core/store/test/test.model';
import { TestActions } from '@core/store/test';

export interface ManageDocumentDialogData<T extends TestActions.AddDocument | TestActions.UpdateDocument> {
    action: Type<T>;
    testId: number;
    document?: TestDocumentModel;
}
