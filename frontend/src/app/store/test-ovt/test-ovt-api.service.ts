import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { testOvtsMock } from '../../mocks/test-ovt';
import { TestOvtModel } from './test-ovt.model';

@Injectable()
export class TestOvtApiService {
    constructor(private http: HttpClient) {}

    add(test: Partial<TestOvtModel>): Observable<TestOvtModel> {
        return of(testOvtsMock[0]);
    }

    delete(id: number): Observable<void> {
        return of(undefined);
    }

    update(test: Pick<TestOvtModel, 'id'> & Partial<TestOvtModel>): Observable<TestOvtModel> {
        return of(testOvtsMock[0]);
    }

    fetchAll(): Observable<TestOvtModel[]> {
        return of(testOvtsMock);
    }
}
