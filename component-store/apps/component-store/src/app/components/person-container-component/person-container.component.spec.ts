import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonContainerComponent } from './person-container.component';

describe('PersonContainerComponentComponent', () => {
  let component: PersonContainerComponent;
  let fixture: ComponentFixture<PersonContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
