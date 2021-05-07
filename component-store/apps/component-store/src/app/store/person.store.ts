import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Person } from '../models/person';
import { StarWarsApiService } from '../services/star-wars-api.service';

export interface PersonState {
  people: Person[];
  editorId: number | undefined;
  editedPerson: Person | undefined;
}

const defaultState: PersonState = {
  people: [],
  editorId: undefined,
  editedPerson: undefined,
};

@Injectable()
export class PersonStore
  extends ComponentStore<PersonState>
  implements OnDestroy {
  private _saveEditPerson$ = new Subject<void>();
  private _subs = new Subscription();

  constructor(private readonly _starWarsApiService: StarWarsApiService) {
    super(defaultState);

    const saveWithData$ = this._saveEditPerson$.pipe(
      withLatestFrom(this.editedPerson$, this.editorId$),
      switchMap(([, person, personId]) =>
        this._starWarsApiService.savePerson(personId, person)
      )
    );

    this._subs.add(
      saveWithData$.subscribe({
        next: (person) => {
          this.updatePerson(person);

          this.clearEditedPerson();
        },
        error: (error) => {
          console.error('An error happened while saving:', error);
        },
      })
    );
  }

  readonly people$ = this.select(({ people }) => people);
  readonly editorId$ = this.select(({ editorId }) => editorId);
  readonly editedPerson$ = this.select(({ editedPerson }) => editedPerson).pipe(
    tap((person) => console.log('editedPerson$', person))
  );

  readonly loadPeople = this.updater((state, people: Person[] | null) => ({
    ...state,
    people: people || [],
  }));

  readonly setEditorId = this.updater(
    (state, editorId: number | undefined) => ({ ...state, editorId })
  );

  readonly setEditedPerson = this.updater(
    (state, editedPerson: Person | undefined) => ({ ...state, editedPerson })
  );

  readonly editPerson = this.effect(
    (personId$: Observable<number | undefined>) =>
      personId$.pipe(
        withLatestFrom(this.people$),
        tap<[number | undefined, Person[]]>(([id, people]) => {
          this.setEditorId(id);

          const personToEdit =
            !id && id !== 0
              ? undefined
              : people.find((person) => person.id === id);

          this.setEditedPerson({ ...personToEdit });
        })
      )
  );

  readonly updatePerson = this.effect((person$: Observable<Person>) =>
    person$.pipe(
      withLatestFrom(this.people$),
      tap<[Person, Person[]]>(([person, people]) => {
        const id = person.id;
        const index = people.findIndex((cur) => {
          console.log('compare', cur, id, cur.id === id);
          return cur.id === id;
        });

        console.log('index', index, person, people);

        if (index > -1) {
          const editedPeople = [...people];
          editedPeople[index] = person;

          this.loadPeople(editedPeople);
        }
      })
    )
  );

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  cancelEditPerson() {
    this.clearEditedPerson();
  }

  private clearEditedPerson() {
    this.setEditorId(undefined);
    this.setEditedPerson(undefined);
  }

  saveEditPerson() {
    this._saveEditPerson$.next();
  }
}
