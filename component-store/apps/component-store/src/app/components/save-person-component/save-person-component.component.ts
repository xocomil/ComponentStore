import { Component } from '@angular/core';
import { PersonStore } from '../../store/person.store';

@Component({
  selector: 'component-store-save-person-component',
  templateUrl: './save-person-component.component.html',
  styleUrls: ['./save-person-component.component.scss'],
})
export class SavePersonComponentComponent {
  constructor(private readonly _personStore: PersonStore) {}

  cancel() {
    this._personStore.cancelEditPerson();
  }

  save() {
    this._personStore.saveEditPerson();
  }
}
