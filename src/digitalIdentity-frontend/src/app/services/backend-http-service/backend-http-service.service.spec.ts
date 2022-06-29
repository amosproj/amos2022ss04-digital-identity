import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BackendHttpService } from './backend-http-service.service';

describe('BackendHttpServiceService', () => {
  let service: BackendHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
    });
    service = TestBed.inject(BackendHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
