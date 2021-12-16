import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TestDocumentModel, TestDocumentStatus } from '@core/store/test/document';
import {
    getDocumentStatusLocalization,
    getDocumentTypeLocalization,
    getGovernmentLocalization,
} from '@core/utils/localization';

@Component({
    selector: 'procyon-document-item',
    templateUrl: './document-item.component.html',
    styleUrls: ['./document-item.component.scss'],
})
export class DocumentItemComponent {
    @Input() title = '';
    @Input() document!: TestDocumentModel;

    @Output() onDocumentStatusChanged = new EventEmitter<TestDocumentStatus>();

    @Output() onDocumentEdit = new EventEmitter();
    @Output() onDocumentRemove = new EventEmitter();
    @Output() onDocumentDownLoad = new EventEmitter<void>();

    readonly getDocumentType = getDocumentTypeLocalization;
    readonly getDocumentStatus = getDocumentStatusLocalization;
    readonly getGovernment = getGovernmentLocalization;

    changeDocumentStatus(status: TestDocumentStatus): void {
        this.onDocumentStatusChanged.emit(status);
    }

    downloadDocument(): void {
        this.onDocumentDownLoad.emit();
    }

    editDocument(): void {
        this.onDocumentEdit.emit();
    }

    removeDocument(): void {
        this.onDocumentRemove.emit();
    }
}
