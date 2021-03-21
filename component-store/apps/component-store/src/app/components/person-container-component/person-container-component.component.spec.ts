import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonContainerComponentComponent } from './person-container-component.component';

describe('PersonContainerComponentComponent', () => {
  let component: PersonContainerComponentComponent;
  let fixture: ComponentFixture<PersonContainerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonContainerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonContainerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
