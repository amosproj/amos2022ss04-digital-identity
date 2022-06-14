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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show test div in devMode', () => {
    expect(component.inDevelopment).toBeDefined();
    let spy = spyOn(component, 'inDevelopment').and.returnValue(true);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.inDevelopment()).toBeTrue();

    let test_div = de.query(By.css('.test-card'));
    expect(test_div).not.toBeNull();
  });

  it('should not show test div in production', () => {
    expect(component.inDevelopment).toBeDefined();
    let spy = spyOn(component, 'inDevelopment').and.returnValue(false);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.inDevelopment()).toBeFalse();

    let test_div = de.query(By.css('.test-card'));
    expect(test_div).toBeNull();
  });

  it('should have an initial state like', () => {
    expect(de.query(By.css('input'))).toBeDefined();
    expect(component.formGroup.invalid).toBeTruthy();
  });

  it('empty input form is invalid', (() => {
    let form = component.formGroup;
    expect(fixture.debugElement.nativeElement.querySelector('input').innerHTML).toBe("");
    expect(form.invalid).toBeTruthy();
  }));

  it('should create a form with email, password field and a button', () => {
    let email = fixture.debugElement.nativeElement.querySelector('input');
    let password = fixture.debugElement.nativeElement.querySelector('input');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
  });

  it('should call loginPostRequest if the inputs are valid', () => {
    let spyLoginPostRequest = spyOn(component, 'loginPostRequest').and.callThrough();
    spyLoginPostRequest.calls.reset();
    expect(spyLoginPostRequest).not.toHaveBeenCalled();

    component.formGroup.controls['email'].setValue('test@fau.de');
    component.formGroup.controls['password'].setValue('test');

    component.loginProcess();

    expect(component.formGroup.valid).toBeTruthy();
    expect(spyLoginPostRequest).toHaveBeenCalled();
  });

});



