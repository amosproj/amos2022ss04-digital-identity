import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { BackendHttpService } from './backend-http-service.service';

describe('BackendHttpServiceService', () => {
  let service: BackendHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
    });
    service = TestBed.inject(BackendHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
