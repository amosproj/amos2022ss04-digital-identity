import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordPopUpComponent } from 'src/app/shared/pop-up/forgot-password-pop-up/forgot-password-pop-up.component';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';

let loader: HarnessLoader;

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
              params: { email: 'test@email.org' },
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
    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the email address to the post parameters in lower case, case: mixed letters', () => {
    let insertedData = {
      email: 'JohnExample@Doe',
      password: 'test',
    };

    component.formGroup.setValue(insertedData);
    expect(component.formGroup.valid).toBeTrue();

    let spy = spyOn(httpService, 'authenticate').and.callFake(function (
      credentials: any,
      callback: any
    ): any {
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

    let spy = spyOn(httpService, 'authenticate').and.callFake(function (
      credentials: any,
      callback: any
    ): any {
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

    let spy = spyOn(httpService, 'authenticate').and.callFake(function (
      credentials: any,
      callback: any
    ): any {
      expect(arguments[0]).toEqual(insertedData);
    });

    component.loginProcess();
    expect(spy).toHaveBeenCalled();
  });

  it('should have a button labeled "Forget Password?" and 3 buttons in total', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(3);

    const forgetPWButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'Forgot Password?' })
    );
    expect(forgetPWButton).toBeDefined();
    expect(await forgetPWButton.isDisabled()).toBe(false);

    expect(await buttons[2].isDisabled()).toBe(true);
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
