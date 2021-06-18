import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { SavePersonComponentComponent } from '../save-person-component/save-person-component.component';
import { EditDisplayComponent } from './edit-display.component';

fdescribe('EditDisplayComponent', () => {
  let component: EditDisplayComponent;
  let fixture: ComponentFixture<EditDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditDisplayComponent,
        MockComponent(SavePersonComponentComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the person', () => {
    const testPerson = {
      name: 'Test Person',
      birth_year: '0',
      eye_color: 'test color',
      id: 0,
      hair_color: 'test color',
      gender: 'test gender',
      mass: '100kg',
      height: '200m',
      skin_color: 'test color',
    };

    component.person = testPerson;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Editing Test Person (0)'
    );
  });
});
