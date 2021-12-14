import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WithoutId } from '@core/utility-types';
import { TestDocumentModel, TestDocumentStatus } from '@core/store/test/document';

export interface DocumentStatusChanged {
    document: TestDocumentModel;
    newStatus: TestDocumentStatus;
}

@Component({
    selector: 'procyon-documents-panel',
    templateUrl: './documents-panel.component.html',
    styleUrls: ['./documents-panel.component.scss'],
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
        switch (document.type) {
            case 'joint_decision':
                return 'Joint decision';
            case 'separate_order':
                return 'Separate order';
            case 'order':
                return 'Order';
            case 'program':
                return 'Program';
            case 'method':
                return document.name ? `Method: ${document.name.slice(0, document.name.lastIndexOf('.'))}` : 'Method';
            default:
                return 'Unknown';
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
