import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Person } from '../models/person';

export interface PersonState {
  people: Person[];
}

const defaultState: PersonState = {
  people: [],
};

@Injectable()
export class PersonStore extends ComponentStore<PersonState> {
  constructor() {
    super(defaultState);
  }

  readonly people$ = this.select(({ people }) => people);

  readonly loadPeople = this.updater((state, people: Person[] | null) => ({
    ...state,
    people: people || [],
  }));
}
