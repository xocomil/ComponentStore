import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EMPTY, of } from 'rxjs';
import { scan } from 'rxjs/operators';
import { Person } from '../models/person';
import { StarWarsApiService } from '../services/star-wars-api.service';
import { PersonStore } from './person.store';

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

describe('PersonStoreService', () => {
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

  describe('editPerson()', () => {
    const people = createTestPeople();

    beforeEach(() => {
      spectator.service.loadPeople(people);
    });

    it('should set the editorId and editedPerson in the state', () => {
      let allIds: (number | undefined)[];
      let allEditedPerson: Person[];

      spectator.service.editorId$
        .pipe(scan((acc: number[], cur) => [...acc, cur], []))
        .subscribe((emits) => {
          allIds = emits;
        });

      spectator.service.editedPerson$
        .pipe(scan((acc: Person[], cur) => [...acc, cur], []))
        .subscribe((emits) => {
          allEditedPerson = emits;
        });

      spectator.service.editPerson(1); // We know ID 1 is in the array

      expect(allIds).toEqual([undefined, 1]);
      expect(allEditedPerson).toEqual([undefined, people[0]]);
    });
  });

  describe('saveEditPerson()', () => {
    const people = createTestPeople();

    beforeEach(() => {
      spectator.service.loadPeople(people);
    });

    describe('Happy Path 😊', () => {
      beforeEach(() => {
        spectator.service.editPerson(1);
      });

      it('should call StarWarsApiService.savePerson() with editorId and editedPerson', () => {
        const starWarsApiServiceMock = spectator.inject(StarWarsApiService);

        starWarsApiServiceMock.savePerson.andReturn(EMPTY);

        spectator.service.saveEditPerson();

        expect(starWarsApiServiceMock.savePerson).toHaveBeenCalledWith(
          1,
          people[0]
        );
      });

      describe('API Success', () => {
        const apiResponse = {
          ...people[0],
          name: `${people[0].name} - Edited`,
        };

        beforeEach(() => {
          const starWarsApiService = spectator.inject(StarWarsApiService);

          starWarsApiService.savePerson.andReturn(of(apiResponse));
        });

        it('should update the store with the value returned from API', () => {
          let emittedPeople: Person[];

          spectator.service.people$.subscribe((emitted) => {
            emittedPeople = emitted;
          });

          spectator.service.saveEditPerson();

          expect(emittedPeople).toEqual([
            apiResponse,
            ...people.filter((cur) => cur.id !== 1),
          ]);
        });

        it('should clear the editedPerson and editorId', () => {
          let allIds: (number | undefined)[];
          let allEditedPerson: Person[];

          spectator.service.editorId$
            .pipe(scan((acc: number[], cur) => [...acc, cur], []))
            .subscribe((emits) => {
              allIds = emits;
            });

          spectator.service.editedPerson$
            .pipe(scan((acc: Person[], cur) => [...acc, cur], []))
            .subscribe((emits) => {
              allEditedPerson = emits;
            });

          spectator.service.saveEditPerson();

          expect(allIds).toEqual([1, undefined]);
          expect(allEditedPerson).toEqual([people[0], undefined]);
        });
      });
    });
  });
});
