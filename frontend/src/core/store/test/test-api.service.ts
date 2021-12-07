import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapTo, startWith, first } from 'rxjs/operators';
import { ApiResponseModel, ApiSingleResponseModel } from '../api-model';
import { TestModel, TestAddModel, TestUpdateModel, TestDeleteModel } from './test.model';
import { extractFilesFromObject } from '@core/utils/api';
import { TEST_ENDPOINT } from '@core/constants/api';
import { testMocks } from '@core/mocks/test-mocks';
import { environment } from '@environment';

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

        let request$ = this.http.post<ApiSingleResponseModel<TestModel>>(`${TEST_ENDPOINT}/`, formData, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [testMocks[0]],
                    meta: {},
                } as ApiSingleResponseModel<TestModel>),
                first(),
            );
        }

        return request$;
    }

    delete(test: TestDeleteModel): Observable<void> {
        let request$ = this.http.delete(`${TEST_ENDPOINT}/${test.id}`).pipe(mapTo(undefined));

        if (environment.useMocks) {
            request$ = request$.pipe(startWith(undefined), first());
        }

        return request$;
    }

    update(test: TestUpdateModel): Observable<ApiSingleResponseModel<TestModel>> {
        let request$ = this.http.patch<ApiSingleResponseModel<TestModel>>(`${TEST_ENDPOINT}/${test.id}`, test, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [testMocks[0]],
                    meta: {},
                } as ApiSingleResponseModel<TestModel>),
                first(),
            );
        }

        return request$;
    }

    getById(id: number): Observable<ApiSingleResponseModel<TestModel>> {
        let request$ = this.http.get<ApiSingleResponseModel<TestModel>>(`${TEST_ENDPOINT}/${id}`, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [testMocks[0]],
                    meta: {},
                } as ApiSingleResponseModel<TestModel>),
                first(),
            );
        }

        return request$;
    }

    fetchAll(): Observable<ApiResponseModel<TestModel>> {
        let request$ = this.http.get<ApiResponseModel<TestModel>>(`${TEST_ENDPOINT}/`, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: testMocks,
                    meta: {},
                } as ApiSingleResponseModel<TestModel>),
                first(),
            );
        }

        return request$;
    }
}
