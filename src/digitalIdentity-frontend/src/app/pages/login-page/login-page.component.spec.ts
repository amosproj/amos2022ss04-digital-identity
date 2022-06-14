import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {BackendHttpService} from "../../services/backend-http-service/backend-http-service.service";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let de: DebugElement;

  let httpTestingController: HttpTestingController;
  let service: BackendHttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendHttpService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BackendHttpService);
  });

});



