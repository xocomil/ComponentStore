import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
}
