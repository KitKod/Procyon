import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapTo, startWith, first } from 'rxjs/operators';
import { ApiResponseModel, ApiSingleResponseModel } from '../api-model';
import { TestModel, TestAddModel, TestUpdateModel, TestDeleteModel, TestModelExtended } from './test.model';
import { extractFilesFromObject } from '@core/utils/api';
import { TEST_ENTITY_ENDPOINT, TESTS_ENDPOINT } from '@core/constants/api';
import { testsMock } from '@core/mocks/test.mock';

@Injectable()
export class TestApiService {
    constructor(private http: HttpClient) {}

    add(test: TestAddModel): Observable<ApiSingleResponseModel<TestModel>> {
        const files: Record<string, File> = extractFilesFromObject(test);
        const apiParams = {
            test: JSON.stringify(test),
            ...files,
        };
        const formData = new FormData();
        Object.entries(apiParams).forEach(([key, value]) => formData.append(key, value));

        return this.http
            .post<ApiSingleResponseModel<TestModel>>(TEST_ENTITY_ENDPOINT, formData, {
                responseType: 'json',
            })
            .pipe(
                startWith({
                    resources: [testsMock[0]],
                    meta: {},
                } as ApiSingleResponseModel<TestModel>),
                first(),
            );
    }

    delete(test: TestDeleteModel): Observable<void> {
        return this.http
            .delete(`${TEST_ENTITY_ENDPOINT}/${test.id}`)
            .pipe(mapTo(undefined))
            .pipe(startWith(undefined), first());
        // return of(undefined);
    }

    update(test: TestUpdateModel): Observable<ApiSingleResponseModel<TestModel>> {
        return this.http
            .patch<ApiSingleResponseModel<TestModel>>(`${TEST_ENTITY_ENDPOINT}/${test.id}`, test, {
                responseType: 'json',
            })
            .pipe(
                startWith({
                    resources: [testsMock[0]],
                    meta: {},
                } as ApiSingleResponseModel<TestModel>),
                first(),
            );
    }

    getById(id: number): Observable<ApiSingleResponseModel<TestModelExtended>> {
        return this.http
            .get<ApiSingleResponseModel<TestModelExtended>>(`${TEST_ENTITY_ENDPOINT}/${id}`, {
                responseType: 'json',
            })
            .pipe(
                startWith({
                    resources: [
                        {
                            ...testsMock[0],
                            documents: [],
                        },
                    ],
                    meta: {},
                } as ApiSingleResponseModel<TestModelExtended>),
                first(),
            );
    }

    fetchAll(): Observable<ApiResponseModel<TestModel>> {
        return this.http
            .get<ApiResponseModel<TestModel>>(TESTS_ENDPOINT, {
                responseType: 'json',
            })
            .pipe(
                startWith({
                    resources: testsMock,
                    meta: {},
                } as ApiSingleResponseModel<TestModel>),
                first(),
            );
    }
}
