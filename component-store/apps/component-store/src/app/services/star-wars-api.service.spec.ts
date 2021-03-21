import { TestBed } from '@angular/core/testing';

import { StarWarsApiService } from './star-wars-api.service';

describe('StarWarsApiService', () => {
  let service: StarWarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
