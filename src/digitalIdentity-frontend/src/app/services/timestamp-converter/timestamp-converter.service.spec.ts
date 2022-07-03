import { TestBed } from '@angular/core/testing';

import { TimestampConverter } from './timestamp-converter.service';

describe('TimestamptToTextService', () => {
  let service: TimestampConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimestampConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
