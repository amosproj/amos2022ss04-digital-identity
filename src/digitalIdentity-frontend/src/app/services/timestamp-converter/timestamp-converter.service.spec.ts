import { TestBed } from '@angular/core/testing';

import { TimestampCoverter } from './timestamp-converter.service';

describe('TimestamptToTextService', () => {
  let service: TimestampCoverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimestampCoverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
