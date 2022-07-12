import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordPopUpComponent } from 'src/app/shared/pop-up/forgot-password-pop-up/forgot-password-pop-up.component';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let de: DebugElement;
  let httpService: BackendHttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Router, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              parmas: { email: 'test@email.org' },
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    httpService = TestBed.inject(BackendHttpService);

    fixture.detectChanges();
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

  it('should add the email address to the post parameters in lower case, case: mixed letters', () => {
    let insertedData = {
      email: 'JohnExample@Doe',
      password: 'test',
    };

    component.formGroup.setValue(insertedData);
    expect(component.formGroup.valid).toBeTrue();

    let spy = spyOn(httpService, 'authenticate').and.callFake(function (credentials:any, callback:any) : any {
      expect(arguments[0]).toEqual(insertedData);
    });

    component.loginProcess();
    expect(spy).toHaveBeenCalled();
  });

  it('should add the email address to the post parameters in lower case, case: lower letters', () => {
    let insertedData = {
      email: 'johannaexample@doe',
      password: 'test',
    };

    component.formGroup.setValue(insertedData);
    expect(component.formGroup.valid).toBeTrue();

    let spy = spyOn(httpService, 'authenticate').and.callFake(function (credentials:any, callback:any) : any {
      expect(arguments[0]).toEqual(insertedData);
    });

    component.loginProcess();
    expect(spy).toHaveBeenCalled();
  });

  it('should add the email address to the post parameters in lower case, case: capital letters', () => {
    let insertedData = {
      email: 'JONATHANEXAMPLE@DOE.COM',
      password: 'test',
    };


    component.formGroup.setValue(insertedData);
    expect(component.formGroup.valid).toBeTrue();

    let spy = spyOn(httpService, 'authenticate').and.callFake(function (credentials:any, callback:any) : any {
      expect(arguments[0]).toEqual(insertedData);
    });

    component.loginProcess();
    expect(spy).toHaveBeenCalled();
  });

  it('should have a button labeled "forget Password?"', () => {
    let test_div = de.query(By.css('#button-container')).nativeElement;
    let buttons = test_div.getElementsByTagName('button');
    let n = buttons.length;
    // console.log(buttons, n);

    let accept = false;
    for (let i = 0; i < n; i++) {
      // console.log(buttons[i], buttons[i].innerText);
      if (buttons[i].innerText == 'Forgot password?') {
        accept = true;
      }
    }
    if (!accept) {
      fail();
    }
  });

  it('should open a ForgotPasswordPopUpComponent on openForgetPassword()', () => {
    // given
    // mock dialogRef.open
    let spy = spyOn(component.dialogRef, 'open').and.stub();
    // when
    component.openForgotPassword();
    // then
    expect(spy).toHaveBeenCalledOnceWith(ForgotPasswordPopUpComponent, {});
  });
});
