import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { PersonStore } from '../../store/person.store';
import { Person } from './../../models/person';
import { EditPersonComponent } from './edit-person.component';

describe('EditPersonComponent', () => {
  let spectator: Spectator<EditPersonComponent>;

  const testPerson: Person = {
    name: 'Test Person',
    id: 1,
    birth_year: '123 BBY',
    eye_color: 'hazel',
    gender: 'unknown',
    hair_color: 'none',
    height: 'really short',
    mass: '2 earths',
    skin_color: 'beige',
  };

  const personStoreStub: Partial<PersonStore> = {
    setEditedPerson: jasmine.createSpy('setEditedPerson'),
  };

  const createComponent = createComponentFactory({
    component: EditPersonComponent,
    providers: [mockProvider(PersonStore, personStoreStub)],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { person: testPerson } });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  describe('personEdited()', () => {
    it('should call PersonStore.saveEditedPerson with the person input', () => {
      const personStoreMock = spectator.inject(PersonStore);

      spectator.component.personEdited();

      expect(personStoreMock.setEditedPerson).toHaveBeenCalledWith(testPerson);
    });
  });
});
