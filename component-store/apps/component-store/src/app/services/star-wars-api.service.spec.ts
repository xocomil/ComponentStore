import { fakeAsync, tick } from '@angular/core/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { Person } from '../models/person';
import { StarWarsApiService } from './star-wars-api.service';

describe('StarWarsApiService', () => {
  let spectator: SpectatorHttp<StarWarsApiService>;

  const createService = createHttpFactory({ service: StarWarsApiService });
  const testPerson: Omit<Person, 'id'> = {
    name: 'test person',
    birth_year: '0',
    eye_color: 'test color',
    gender: 'test gender',
    hair_color: 'test color',
    height: '15mm',
    mass: '2.5kg',
    skin_color: 'test color',
  };

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  describe('getPeople()', () => {
    const swapiPeopleUrl = 'https://swapi.dev/api/people';

    it('should call SWAPI', () => {
      spectator.service.getPeople().subscribe();

      const req = spectator.expectOne(swapiPeopleUrl, HttpMethod.GET);

      req.flush({ results: [] });
    });

    it('should add an index as an id', () => {
      spectator.service
        .getPeople()
        .subscribe((people) =>
          expect(people).toEqual([{ ...testPerson, id: 0 }])
        );

      const req = spectator.expectOne(swapiPeopleUrl, HttpMethod.GET);

      req.flush({ results: [testPerson] });
    });
  });

  describe('savePerson()', () => {
    it('should return the person after delay', fakeAsync(() => {
      const id = 1;
      const personToSave = { ...testPerson, id };

      spectator.service.savePerson(id, personToSave).subscribe((person) => {
        expect(person).toBe(personToSave);
      });

      tick(2000);
    }));
  });
});
