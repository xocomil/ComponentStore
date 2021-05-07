import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePersonComponentComponent } from './save-person-component.component';

describe('SavePersonComponentComponent', () => {
  let component: SavePersonComponentComponent;
  let fixture: ComponentFixture<SavePersonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePersonComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePersonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
