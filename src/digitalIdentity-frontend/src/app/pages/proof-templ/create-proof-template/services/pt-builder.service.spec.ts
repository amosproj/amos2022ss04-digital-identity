import { TestBed } from '@angular/core/testing';

import { PtBuilderService } from './pt-builder.service';

describe('PtBuilderService', () => {
  let service: PtBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PtBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
