import { TestBed } from '@angular/core/testing';

import { FiguresService } from './figures.service';

describe('FiguresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiguresService = TestBed.get(FiguresService);
    expect(service).toBeTruthy();
  });
});
