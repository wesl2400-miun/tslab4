import { TestBed } from '@angular/core/testing';

import { Finder } from './finder';

describe('Finder', () => {
  let service: Finder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Finder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
