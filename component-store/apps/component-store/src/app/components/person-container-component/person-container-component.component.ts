import { Component, OnInit } from '@angular/core';
import { StarWarsApiService } from '../../services/star-wars-api.service';
import { PersonStore } from '../../store/person.store';

@Component({
  selector: 'component-store-person-container-component',
  templateUrl: './person-container-component.component.html',
  styleUrls: ['./person-container-component.component.scss'],
  providers: [PersonStore],
})
export class PersonContainerComponentComponent implements OnInit {
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
