import { createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { SavePersonComponentComponent } from '../save-person-component/save-person-component.component';
import { EditDisplayComponent } from './edit-display.component';

describe('EditDisplayComponent', () => {
  const createComponent = createComponentFactory({
    component: EditDisplayComponent,
    declarations: [MockComponent(SavePersonComponentComponent)],
  });

  it('should create', () => {
    const spectator = createComponent();

    expect(spectator).toBeTruthy();
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

    const spectator = createComponent({ props: { person: testPerson } });

    expect(spectator.element).toHaveText('Editing Test Person (0)');
  });
});
