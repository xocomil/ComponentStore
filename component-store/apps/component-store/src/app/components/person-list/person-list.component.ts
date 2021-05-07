import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonStore } from '../../store/person.store';

@Component({
  selector: 'component-store-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  people$ = this._personStore.people$;
  editedPerson$ = this._personStore.editedPerson$;
  editorId$ = this._personStore.editorId$;

  displayedColumns = [
    'name',
    'birth_year',
    'eye_color',
    'gender',
    'hair_color',
    'height',
    'mass',
    'controls',
  ];

  constructor(private readonly _personStore: PersonStore) {}

  editPerson(id: number): void {
    this._personStore.editPerson(id);
  }
}
