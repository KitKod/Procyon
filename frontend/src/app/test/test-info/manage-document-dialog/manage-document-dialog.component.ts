import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FileChangeEvent } from '@angular/compiler-cli/src/perform_watch';
import { ManageDocumentDialogData } from './manage-document-dialog.data';
import { TestDocumentActions, DocumentAddModel, DocumentUpdateModel } from '@core/store/test/document';

@Component({
    selector: 'procyon-manage-document-dialog',
    templateUrl: './manage-document-dialog.component.html',
    styleUrls: ['./manage-document-dialog.component.scss'],
})
export class ManageDocumentDialogComponent<T extends TestDocumentActions.Add | TestDocumentActions.Update> {
    documentFormGroup = this.fb.group({
        type: [this.data.document?.type, Validators.required],
        status: [this.data.document?.status, Validators.required],
        government: [this.data.document?.government, Validators.required],
        date_of_approval: [this.data.document?.date_of_approval, Validators.required],
        material_and_technical_means: [this.data.document?.material_and_technical_means, Validators.required],
        document_file: [this.data.document ? new File(['124'], this.data.document.name) : null, Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private store: Store,
        @Inject(MAT_DIALOG_DATA) private readonly data: ManageDocumentDialogData<T>,
        private datePipe: DatePipe,
    ) {}

    onSave(): void {
        const { testId, action } = this.data;
        this.store.dispatch(new action(testId, this.getDocumentForDispatching()));
    }

    obFileChange(event: FileChangeEvent): void {
        // TODO
    }

    private getDocumentForDispatching(): DocumentAddModel | DocumentUpdateModel {
        const { document } = this.data;
        const { date_of_approval, ...formValue } = this.documentFormGroup.value;

        return Object.entries({ date_of_approval, ...formValue }).reduce<DocumentAddModel | DocumentUpdateModel>(
            (acc: Record<string, unknown>, [key, value]) => {
                if (document?.[key as keyof typeof document] !== value) {
                    acc[key] = value;
                }

                return acc as DocumentAddModel | DocumentUpdateModel;
            },
            {
                ...(document?.id && { id: document?.id }),
            } as DocumentAddModel | DocumentUpdateModel,
        );
    }
}
