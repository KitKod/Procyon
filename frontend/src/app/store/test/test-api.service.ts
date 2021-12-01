import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { testsMock } from '../../mocks/test.mock';
import { TestModel } from './test.model';

@Injectable()
export class TestApiService {
    constructor(private http: HttpClient) {}

    add(test: Partial<TestModel>): Observable<TestModel> {
        return of(testsMock[0]);
    }

    delete(id: number): Observable<void> {
        return of(undefined);
    }

    update(test: Pick<TestModel, 'id'> & Partial<TestModel>): Observable<TestModel> {
        return of(testsMock[0]);
    }

    fetchAll(): Observable<TestModel[]> {
        return of(testsMock);
    }
}
