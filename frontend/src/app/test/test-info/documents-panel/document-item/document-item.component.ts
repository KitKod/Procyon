import { Component, Input } from '@angular/core';
import { TestDocumentModel } from '@core/store/test/test.model';
import { WithoutId } from '@core/utility-types';

@Component({
    selector: 'procyon-document-item',
    templateUrl: './document-item.component.html',
    styleUrls: ['./document-item.component.scss'],
})
export class DocumentItemComponent {
    @Input() title = '';
    @Input() document!: WithoutId<TestDocumentModel>;
}
