import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapTo, startWith, first } from 'rxjs/operators';
import { ApiResponseModel, ApiSingleResponseModel } from '../api-model';
import { AmeModel, AmeAddModel, AmeUpdateModel, AmeDeleteModel } from './ame.model';
import { extractFilesFromObject } from '@core/utils/api';
import { AME_ENDPOINT } from '@core/constants/api';
import { ameMocks } from '@core/mocks/ame-mocks';
// import { environment } from '@environment';
const environment = { useMocks: true };

@Injectable()
export class AmeApiService {
    constructor(private http: HttpClient) {}

    add(ame: AmeAddModel): Observable<ApiSingleResponseModel<AmeModel>> {
        const files: Record<string, File> = extractFilesFromObject(ame);
        const body = { ame: JSON.stringify(ame), ...files };
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => formData.append(key, value));

        let request$ = this.http.post<ApiSingleResponseModel<AmeModel>>(`${AME_ENDPOINT}/`, formData, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [ameMocks[0]],
                    meta: {},
                } as ApiSingleResponseModel<AmeModel>),
                first(),
            );
        }

        return request$;
    }

    delete(ame: AmeDeleteModel): Observable<void> {
        let request$ = this.http.delete(`${AME_ENDPOINT}/${ame.id}`).pipe(mapTo(undefined));

        if (environment.useMocks) {
            request$ = request$.pipe(startWith(undefined), first());
        }

        return request$;
    }

    update(ame: AmeUpdateModel): Observable<ApiSingleResponseModel<AmeModel>> {
        const files: Record<string, File> = extractFilesFromObject(ame);
        const body = { ame: JSON.stringify(ame), ...files };
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => formData.append(key, value));

        let request$ = this.http.patch<ApiSingleResponseModel<AmeModel>>(`${AME_ENDPOINT}/${ame.id}`, formData, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [ameMocks[0]],
                    meta: {},
                } as ApiSingleResponseModel<AmeModel>),
                first(),
            );
        }

        return request$;
    }

    getById(id: number): Observable<ApiSingleResponseModel<AmeModel>> {
        let request$ = this.http.get<ApiSingleResponseModel<AmeModel>>(`${AME_ENDPOINT}/${id}`, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [ameMocks[id - 1]],
                    meta: {},
                } as ApiSingleResponseModel<AmeModel>),
                first(),
            );
        }

        return request$;
    }

    fetchAll(): Observable<ApiResponseModel<AmeModel>> {
        let request$ = this.http.get<ApiResponseModel<AmeModel>>(`${AME_ENDPOINT}/`, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: ameMocks,
                    meta: {},
                } as ApiSingleResponseModel<AmeModel>),
                first(),
            );
        }

        return request$;
    }
}
