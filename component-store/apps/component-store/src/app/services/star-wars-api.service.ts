import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { Person } from '../models/person';

const API_ROOT = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root',
})
export class StarWarsApiService {
  constructor(private readonly _httpClient: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this._httpClient
      .get(`${API_ROOT}/people`)
      .pipe(
        map((res: ApiResponse) =>
          res.results.map((person, index) => ({ ...person, id: index }))
        )
      );
  }

  savePerson(id: number, person: Person) {
    return of(person).pipe(delay(Math.random() * 2000));
  }
}
