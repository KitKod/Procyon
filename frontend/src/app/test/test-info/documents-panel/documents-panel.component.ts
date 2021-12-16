import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TestDocumentModel, TestDocumentStatus } from '@core/store/test/document';
import { getDocumentTypeLocalization } from '@core/utils/localization';

export interface DocumentStatusChanged {
    document: TestDocumentModel;
    newStatus: TestDocumentStatus;
}

@Component({
    selector: 'procyon-documents-panel',
    templateUrl: './documents-panel.component.html',
})
export class DocumentsPanelComponent {
    @Input() title = '';
    @Input() documents: TestDocumentModel[] = [];
    @Input() canAddDocument = true;

    @Output() onAddDocument = new EventEmitter<TestDocumentModel>();
    @Output() onDocumentEdit = new EventEmitter<TestDocumentModel>();
    @Output() onDocumentRemove = new EventEmitter<TestDocumentModel>();
    @Output() onDocumentDownload = new EventEmitter<TestDocumentModel>();
    @Output() onDocumentStatusChanged = new EventEmitter<DocumentStatusChanged>();

    getDocumentTitleByName(document: TestDocumentModel): string {
        const base = getDocumentTypeLocalization(document.type);
        switch (document.type) {
            case 'method':
                return document.name ? `${base}: ${document.name.slice(0, document.name.lastIndexOf('.'))}` : base;
            default:
                return base;
        }
    }

    editDocument(document: TestDocumentModel): void {
        this.onDocumentEdit.emit(document);
    }

    removeDocument(document: TestDocumentModel): void {
        this.onDocumentRemove.emit(document);
    }

    downloadDocument(document: TestDocumentModel): void {
        this.onDocumentDownload.emit(document);
    }

    addDocument(): void {
        this.onAddDocument.emit();
    }

    documentStatusChanged(document: TestDocumentModel, newStatus: TestDocumentStatus): void {
        this.onDocumentStatusChanged.emit({ document, newStatus });
    }
}
