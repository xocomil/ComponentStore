import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { scan } from 'rxjs/operators';
import { Person } from '../models/person';
import { StarWarsApiService } from '../services/star-wars-api.service';
import { PersonStore } from './person.store';

fdescribe('PersonStoreService', () => {
  let spectator: SpectatorService<PersonStore>;

  const createService = createServiceFactory({
    service: PersonStore,
    mocks: [StarWarsApiService],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  describe('loadPeople()', () => {
    it('should put the Person[] in the store that is passed in', () => {
      const people: Person[] = createTestPeople();
      let allEmits: Person[][];

      spectator.service.people$
        .pipe(scan((acc: Person[][], cur) => [...acc, cur], []))
        .subscribe((emits) => {
          allEmits = emits;
        });

      spectator.service.loadPeople(people);

      expect(allEmits).toEqual([[], people]);
    });

    it('should put the [] in the store if null is passed in', () => {
      const people: Person[] = createTestPeople();
      let allEmits: Person[][];

      spectator.service.people$
        .pipe(scan((acc: Person[][], cur) => [...acc, cur], []))
        .subscribe((emits) => {
          allEmits = emits;
        });

      spectator.service.loadPeople(people);
      spectator.service.loadPeople(null);

      expect(allEmits).toEqual([[], people, []]);
    });
  });
});

const createTestPeople = (): Person[] => {
  return [
    {
      id: 1,
      birth_year: '123 BBY',
      eye_color: 'blue',
      gender: 'unspecified',
      hair_color: 'purple',
      height: 'really tall',
      mass: '1200 kg',
      name: 'Test Subject 1',
      skin_color: 'blue',
    },
    {
      id: 2,
      birth_year: '123 BBY',
      eye_color: 'blue',
      gender: 'unspecified',
      hair_color: 'purple',
      height: 'really tall',
      mass: '1200 kg',
      name: 'Test Subject 2',
      skin_color: 'blue',
    },
    {
      id: 3,
      birth_year: '123 BBY',
      eye_color: 'blue',
      gender: 'unspecified',
      hair_color: 'purple',
      height: 'really tall',
      mass: '1200 kg',
      name: 'Test Subject 3',
      skin_color: 'blue',
    },
  ];
};
