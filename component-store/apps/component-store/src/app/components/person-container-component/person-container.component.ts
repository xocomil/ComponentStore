import { Component, OnInit } from '@angular/core';
import { StarWarsApiService } from '../../services/star-wars-api.service';
import { PersonStore } from '../../store/person.store';

@Component({
  selector: 'component-store-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.scss'],
  providers: [PersonStore],
})
export class PersonContainerComponent implements OnInit {
  editedPerson$ = this._personStore.editedPerson$;

  constructor(
    private readonly _personStore: PersonStore,
    private readonly _starWarsApi: StarWarsApiService
  ) {}

  ngOnInit(): void {
    this._starWarsApi.getPeople().subscribe({
      next: (people) => {
        this._personStore.loadPeople(people);
      },
    });
  }
}
