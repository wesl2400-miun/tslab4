import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderForm } from './finder-form';

describe('FinderForm', () => {
  let component: FinderForm;
  let fixture: ComponentFixture<FinderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinderForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FinderForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
