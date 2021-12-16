import { FileChangeEvent } from '@angular/compiler-cli/src/perform_watch';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DOCUMENT_GOVERNMENTS } from '@core/constants/test-documnet-constants';
import { getDocumentTypeLocalization, getGovernmentLocalization } from '@core/utils/localization';

import { ManageDocumentDialogData } from './manage-document-dialog.data';

@Component({
    selector: 'procyon-manage-document-dialog',
    templateUrl: './manage-document-dialog.component.html',
})
export class ManageDocumentDialogComponent {
    readonly title = this.data.title;
    readonly documentTypes = this.data.availableTypes;
    readonly canUploadFile = this.data.canUploadFile;

    documentFormGroup = this.fb.group({
        type: [this.data.prefilledData?.type, Validators.required],
        status: [this.data.prefilledData?.status, Validators.required],
        government: [this.data.prefilledData?.government, Validators.required],
        date_of_approval: [this.data.prefilledData?.date_of_approval],
        material_and_technical_means: [this.data.prefilledData?.material_and_technical_means],
        document_file: [null, this.canUploadFile ? Validators.required : Validators.nullValidator],
    });

    readonly documentGovernments = DOCUMENT_GOVERNMENTS;
    readonly getGovernment = getGovernmentLocalization;
    readonly getDocumentType = getDocumentTypeLocalization;

    constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private readonly data: ManageDocumentDialogData) {}

    onSave(): void {
        this.data.onSaveCallback(this.documentFormGroup.value);
    }

    onFileChange(event: FileChangeEvent): void {
        // TODO
        console.log(event);
    }
}
