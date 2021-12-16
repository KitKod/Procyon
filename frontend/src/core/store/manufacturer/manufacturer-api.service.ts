import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, mapTo, startWith } from 'rxjs/operators';

import { MANUFACTURER_ENDPOINT } from '@core/constants/api';
import { manufacturersMock } from '@core/mocks/manufacturer-mocks';

import { ApiResponseModel, ApiSingleResponseModel } from '../api-model';
import {
    ManufacturerAddModel,
    ManufacturerDeleteModel,
    ManufacturerModel,
    ManufacturerUpdateModel,
} from './manufacturer.model';
// import { environment } from '@environment';
const environment = { useMocks: true };

@Injectable()
export class ManufacturerApiService {
    constructor(private http: HttpClient) {}

    add(manufacturer: ManufacturerAddModel): Observable<ApiSingleResponseModel<ManufacturerModel>> {
        let request$ = this.http.post<ApiSingleResponseModel<ManufacturerModel>>(
            `${MANUFACTURER_ENDPOINT}/`,
            { manufacturer },
            {
                responseType: 'json',
            },
        );

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [{ ...manufacturersMock[0], ...manufacturer }],
                    meta: {},
                } as ApiSingleResponseModel<ManufacturerModel>),
                first(),
            );
        }

        return request$;
    }

    delete(manufacturer: ManufacturerDeleteModel): Observable<void> {
        let request$ = this.http.delete(`${MANUFACTURER_ENDPOINT}/${manufacturer.id}`).pipe(mapTo(undefined));

        if (environment.useMocks) {
            request$ = request$.pipe(startWith(undefined), first());
        }

        return request$;
    }

    update(manufacturer: ManufacturerUpdateModel): Observable<ApiSingleResponseModel<ManufacturerModel>> {
        let request$ = this.http.patch<ApiSingleResponseModel<ManufacturerModel>>(
            `${MANUFACTURER_ENDPOINT}/${manufacturer.id}`,
            manufacturer,
            {
                responseType: 'json',
            },
        );

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [manufacturersMock[0]],
                    meta: {},
                } as ApiSingleResponseModel<ManufacturerModel>),
                first(),
            );
        }

        return request$;
    }

    getById(id: number): Observable<ApiSingleResponseModel<ManufacturerModel>> {
        let request$ = this.http.get<ApiSingleResponseModel<ManufacturerModel>>(`${MANUFACTURER_ENDPOINT}/${id}`, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: [manufacturersMock[0]],
                    meta: {},
                } as ApiSingleResponseModel<ManufacturerModel>),
                first(),
            );
        }

        return request$;
    }

    fetchAll(): Observable<ApiResponseModel<ManufacturerModel>> {
        let request$ = this.http.get<ApiResponseModel<ManufacturerModel>>(`${MANUFACTURER_ENDPOINT}/`, {
            responseType: 'json',
        });

        if (environment.useMocks) {
            request$ = request$.pipe(
                startWith({
                    resource: manufacturersMock,
                    meta: {},
                } as ApiSingleResponseModel<ManufacturerModel>),
                first(),
            );
        }

        return request$;
    }
}
