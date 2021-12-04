import { Component, OnInit, Input } from '@angular/core';
import { WithoutId } from '@core/utility-types';
import { TestDocumentModel, TestDocumentType } from '@core/store/test/test.model';

@Component({
    selector: 'procyon-documents-panel',
    templateUrl: './documents-panel.component.html',
    styleUrls: ['./documents-panel.component.scss'],
})
export class DocumentsPanelComponent {
    @Input() title = '';

    @Input() documents!: WithoutId<TestDocumentModel>[];

    getDocumentTitleByName(document: WithoutId<TestDocumentModel>): string {
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
                return document.file_index
                    ? `Method: ${document.name.slice(0, document.name.lastIndexOf('.'))}`
                    : 'Method';
            default:
                return 'Unknown';
        }
    }
}
