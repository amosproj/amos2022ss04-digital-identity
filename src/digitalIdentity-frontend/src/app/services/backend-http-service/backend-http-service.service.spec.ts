import { TestBed } from '@angular/core/testing';

import { BackendHttpService } from './backend-http-service.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BackendHttpServiceService', () => {
  let service: BackendHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(BackendHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
