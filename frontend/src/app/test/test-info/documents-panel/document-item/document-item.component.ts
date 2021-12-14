import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestDocumentModel, TestDocumentStatus } from '@core/store/test/document';
import { WithoutId } from '@core/utility-types';

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
