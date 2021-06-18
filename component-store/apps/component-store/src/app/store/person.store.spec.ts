import { TestBed } from '@angular/core/testing';
import { PersonStore } from './person.store';

describe('PersonStoreService', () => {
  let service: PersonStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
