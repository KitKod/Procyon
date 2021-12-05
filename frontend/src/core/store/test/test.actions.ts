import { TestAddModel, TestUpdateModel, TestDeleteModel, DocumentAddModel, DocumentUpdateModel } from './test.model';

export namespace TestActions {
    export class Add {
        static readonly type = '[Test] Add';
        constructor(public test: TestAddModel) {}
    }
    export class Update {
        static readonly type = '[Test] Update';
        constructor(public test: TestUpdateModel) {}
    }

    export class Delete {
        static readonly type = '[Test] Delete';
        constructor(public test: TestDeleteModel) {}
    }

    export class GetById {
        static readonly type = '[Test] GetById';
        constructor(public testId: number) {}
    }

    export class FetchAll {
        static readonly type = '[Test] Fetch All';
    }

    export class GetDocuments {
        static readonly type = '[Test] GetDocuments';
        constructor(public testId: number) {}
    }

    export class AddDocument {
        static readonly type = '[Test] CreateDocument';
        constructor(public testId: number, public document: DocumentAddModel) {}
    }

    export class UpdateDocument {
        static readonly type = '[Test] UpdateDocument';
        constructor(public testId: number, public document: DocumentUpdateModel) {}
    }

    export class DeleteDocument {
        static readonly type = '[Test] DeleteDocument';
        constructor(public documentId: number) {}
    }
}

// Test document API
// GET /tests/:testId/documents
// POST /tests/:testId/documents
// PATCH /tests/:testId/documents/:documentId
// DELETE /tests/:testId/documents/:documentId
