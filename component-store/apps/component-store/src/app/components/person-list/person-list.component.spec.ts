import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { PersonStore } from '../../store/person.store';
import { PersonListComponent } from './person-list.component';

describe('PersonListComponent', () => {
  let spectator: Spectator<PersonListComponent>;

  const editorId$ = new Subject<number>();

  const personStoreStub: Partial<PersonStore> = {
    editorId$,
  };

  const createComponent = createComponentFactory({
    component: PersonListComponent,
    providers: [mockProvider(PersonStore, personStoreStub)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should emit the values from PersonStore.editorId', () => {
    let emittedIds: (number | undefined)[];

    spectator.component.editorId$
      .pipe(scan((acc, cur) => [...acc, cur], []))
      .subscribe((ids) => (emittedIds = ids));

    editorId$.next(1);
    editorId$.next(15);
    editorId$.next(undefined);

    expect(emittedIds).toEqual([1, 15, undefined]);
  });
});
