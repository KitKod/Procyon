import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, mapTo, startWith } from 'rxjs/operators';

import { DOCUMENT_ENDPOINT } from '@core/constants/api';
import { extractFilesFromObject } from '@core/utils/api';

import { testDocumentBlob, testDocumentMocks } from '../../../mocks/test-document-mocks';
import { ApiResponseModel, ApiSingleResponseModel } from '../../api-model';
import { DocumentAddModel, DocumentDeleteModel, DocumentUpdateModel, TestDocumentModel } from './document.model';
// import { environment } from '@environment';
const environment = { useMocks: true };

@Injectable()
export class TestDocumentApiService {
    constructor(private http: HttpClient) {}

    add(testId: number, document: DocumentAddModel): Observable<ApiResponseModel<TestDocumentModel>> {
        const files: Record<string, File> = extractFilesFromObject(document);
        const body = { document: JSON.stringify(document), ...files };
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => formData.append(key, value));

        let request$ = this.http.post<ApiResponseModel<TestDocumentModel>>(`${DOCUMENT_ENDPOINT(testId)}/`, formData, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [{ ...testDocumentMocks[0], ...document, id: 0 }],
                    meta: {},
                } as ApiResponseModel<TestDocumentModel>),
                first(),
            );
        }

        return request$;
    }

    delete(testId: number, document: DocumentDeleteModel): Observable<void> {
        let request$ = this.http.delete(`${DOCUMENT_ENDPOINT(testId)}/${document.id}`).pipe(mapTo(undefined));

        if (environment.useMocks) {
            request$ = request$.pipe(startWith(undefined), first());
        }

        return request$;
    }

    update(testId: number, document: DocumentUpdateModel): Observable<ApiSingleResponseModel<TestDocumentModel>> {
        const files: Record<string, File> = extractFilesFromObject(document);
        const body = { document: JSON.stringify(document), ...files };
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => formData.append(key, value));

        let request$ = this.http.patch<ApiSingleResponseModel<TestDocumentModel>>(
            `${DOCUMENT_ENDPOINT(testId)}/${document.id}`,
            formData,
            {
                responseType: 'json',
            },
        );

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [{ ...testDocumentMocks[0], ...document }],
                    meta: {},
                } as ApiSingleResponseModel<TestDocumentModel>),
                first(),
            );
        }

        return request$;
    }

    getAllForTest(testId: number): Observable<ApiResponseModel<TestDocumentModel>> {
        let request$ = this.http.get<ApiSingleResponseModel<TestDocumentModel>>(`${DOCUMENT_ENDPOINT(testId)}`, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: testDocumentMocks,
                    meta: {},
                } as ApiSingleResponseModel<TestDocumentModel>),
                first(),
            );
        }

        return request$;
    }

    downloadDocument(testId: number, documentId: number): Observable<Blob> {
        let request$ = this.http.get(`${DOCUMENT_ENDPOINT(testId)}/${documentId}/`, { responseType: 'blob' });

        if (environment.useMocks) {
            request$ = of(testDocumentBlob);
        }

        return request$;
    }
}
