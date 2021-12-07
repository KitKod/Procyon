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
    @Input() document!: WithoutId<TestDocumentModel>;

    @Output() documentStatusChanged = new EventEmitter<{
        document: WithoutId<TestDocumentModel>;
        status: TestDocumentStatus;
    }>();

    changeDocumentStatus(document: WithoutId<TestDocumentModel>, status: TestDocumentStatus): void {
        this.documentStatusChanged.emit({ document, status });
    }

    downloadDocument(): void {
        // var _url = window.URL.createObjectURL(blob);
        // window.open(_url, "_blank").focus(); // window.open + focus
    }
}
