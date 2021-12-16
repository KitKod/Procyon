import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { merge } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TestDocumentActions } from './document.actions';
import { TestDocumentModel } from './document.model';
import { TestDocumentApiService } from './document-api.service';

export interface DocumentStateModel {
    documents: { [testId: number]: TestDocumentModel[] };
    documentsBlobs: { [testId: number]: { [documentId: number]: Blob } };
}

@State<DocumentStateModel>({
    name: 'document',
    defaults: {
        documents: {},
        documentsBlobs: {},
    },
})
@Injectable()
export class TestDocumentState {
    static documents(testId: number): (state: DocumentStateModel) => TestDocumentModel[] {
        return createSelector([TestDocumentState], (state: DocumentStateModel) => {
            return state.documents[testId] || [];
        });
    }

    static documentFile(testId: number, documentId: number): (state: DocumentStateModel) => Blob | null {
        return createSelector([TestDocumentState], (state: DocumentStateModel) => {
            return (state.documentsBlobs[testId] || [])[documentId];
        });
    }

    constructor(private api: TestDocumentApiService) {}

    @Action(TestDocumentActions.Add)
    add(ctx: StateContext<DocumentStateModel>, { testId, document }: TestDocumentActions.Add): Observable<void> {
        return this.api.add(testId, document).pipe(
            map(response => {
                const { documents } = ctx.getState();
                ctx.patchState({
                    documents: {
                        ...documents,
                        [testId]: [merge(document, response.resource[0]), ...documents[testId]],
                    },
                });
            }),
        );
    }

    @Action(TestDocumentActions.Delete)
    delete(ctx: StateContext<DocumentStateModel>, { testId, document }: TestDocumentActions.Delete): Observable<void> {
        return this.api.delete(testId, document).pipe(
            map(() => {
                const { documents } = ctx.getState();
                ctx.patchState({
                    documents: {
                        ...documents,
                        [testId]: documents[testId].filter(({ id }) => id !== document.id),
                    },
                });
            }),
        );
    }

    @Action(TestDocumentActions.Update)
    update(ctx: StateContext<DocumentStateModel>, { testId, document }: TestDocumentActions.Update): Observable<void> {
        return this.api.update(testId, document).pipe(
            map(response => {
                const { documents } = ctx.getState();
                const newDocument = response.resource[0];
                ctx.patchState({
                    documents: {
                        ...documents,
                        [testId]: (documents[testId] || [newDocument]).map(oldDoc =>
                            oldDoc.id === document.id
                                ? (merge(oldDoc, document, newDocument) as TestDocumentModel)
                                : oldDoc,
                        ),
                    },
                });
            }),
        );
    }

    @Action(TestDocumentActions.GetAllForTest)
    getAllForTest(
        ctx: StateContext<DocumentStateModel>,
        { testId }: TestDocumentActions.GetAllForTest,
    ): Observable<void> {
        return this.api.getAllForTest(testId).pipe(
            map(response => {
                const { documents } = ctx.getState();
                ctx.patchState({
                    documents: {
                        ...documents,
                        [testId]: response.resource,
                    },
                });
            }),
        );
    }

    @Action(TestDocumentActions.Download)
    downloadDocument(
        ctx: StateContext<DocumentStateModel>,
        { testId, documentId }: TestDocumentActions.Download,
    ): Observable<void> {
        if (ctx.getState().documentsBlobs[testId]?.[documentId]) {
            return of();
        }

        return this.api.downloadDocument(testId, documentId).pipe(
            map(response => {
                const { documentsBlobs } = ctx.getState();
                ctx.patchState({
                    documentsBlobs: {
                        ...documentsBlobs,
                        [testId]: {
                            ...documentsBlobs[testId],
                            [documentId]: response,
                        },
                    },
                });
            }),
        );
    }
}
