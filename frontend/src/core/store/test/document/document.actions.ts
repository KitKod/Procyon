import { DocumentUpdateModel, DocumentAddModel, DocumentDeleteModel } from './document.model';

export namespace TestDocumentActions {
    export class Add {
        static readonly type = '[Test Document] Add';
        constructor(public testId: number, public document: DocumentAddModel) {}
    }

    export class Update {
        static readonly type = '[Test Document] UpdateDocument';
        constructor(public testId: number, public document: DocumentUpdateModel) {}
    }

    export class Delete {
        static readonly type = '[Test Document] DeleteDocument';
        constructor(public testId: number, public document: DocumentDeleteModel) {}
    }

    export class GetAllForTest {
        static readonly type = '[Test Document] GetAllForTest';
        constructor(public testId: number) {}
    }

    export class Download {
        static readonly type = '[Test Document] OpenLinkWithFile';
        constructor(public testId: number, public documentId: number) {}
    }
}
