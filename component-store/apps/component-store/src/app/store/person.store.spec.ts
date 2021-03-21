import { TestBed } from '@angular/core/testing';

import { PersonStoreService } from './person-store.service';

describe('PersonStoreService', () => {
  let service: PersonStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
