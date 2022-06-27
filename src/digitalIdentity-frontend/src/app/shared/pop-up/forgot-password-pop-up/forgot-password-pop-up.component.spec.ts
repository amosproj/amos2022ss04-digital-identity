import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import { ForgotPasswordPopUpComponent } from './forgot-password-pop-up.component';

describe('ForgotPasswordPopUpComponent', () => {
  let component: ForgotPasswordPopUpComponent;
  let fixture: ComponentFixture<ForgotPasswordPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordPopUpComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: function () {},
          },
        },
        { provide: Router, useValue: {} },
        {
          provide: BackendHttpService,
          useValue: {
            postRequest: postRequestFail,
          },
        },

        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on cancelButtonEvent', () => {
    // given
    let spy = spyOn(component.dialogRef, 'close');

    // when
    component.cancelButtonEvent();

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not send a post request on Submit if form is empty', () => {
    // given
    component.formGroup.get('email')?.patchValue('');
    let spy = spyOn(component.httpService, 'postRequest');
    fixture.detectChanges();

    // when
    component.submitEvent();

    // then
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not send a post request on Submit if form is not valid', () => {
    // given
    component.formGroup.get('email')?.patchValue('not a mail');
    let spy = spyOn(component.httpService, 'postRequest');
    fixture.detectChanges();

    // when
    component.submitEvent();

    // then
    expect(spy).not.toHaveBeenCalled();
  });

  it('should send a post to "/auth/password/forgot"', () => {
    // given
    let email = 'test@org.de';
    component.formGroup.get('email')?.patchValue(email);
    let spy = spyOn(component.httpService, 'postRequest').and.callFake(
      (processName: string, path: string, data: any, params: HttpParams) => {
        expect(path).toEqual('/auth/password/forgot');
        expect(params.get('email')).toEqual(email);
        return postRequestSucess();
      }
    );
    fixture.detectChanges();

    // when
    component.submitEvent();

    // then
    expect(spy).toHaveBeenCalled();
  });
});

// mocking BackendHttpRequest
const postRequestFail = () => {
  return new Promise<any>(function (resolve, reject) {
    return new HttpResponse({
      body: 'Error',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      status: 400,
      statusText: 'OK',
      url: '',
    });
  });
};

const postRequestSucess = () => {
  return new Promise<any>(function (resolve, reject) {
    return new HttpResponse({
      body: 'Ok',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      status: 200,
      statusText: 'OK',
      url: '',
    });
  });
};
