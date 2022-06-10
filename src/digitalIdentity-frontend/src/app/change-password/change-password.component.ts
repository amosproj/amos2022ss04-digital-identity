import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { InformationPopUpComponent } from '../information-pop-up/information-pop-up.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  hide_old: boolean = true;
  hide: boolean = true;
  formGroup: FormGroup;
  password: FormControl;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router
  ) {
    this.password = new FormControl('', [
      Validators.required,
      createPasswordStrengthValidator(),
    ]);

    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        old_password: new FormControl('', Validators.required),
        password: this.password,
        confirm: new FormControl('', Validators.required),
      },
      createMatchPasswordValidator()
    );
  }

  ngOnInit(): void {}

  submitEvent() {
    if (this.formGroup.valid) {
      let params: HttpParams = this.buildParams();
      this.postRequest(params);
    }
  }

  buildParams(): HttpParams {
    let params = new HttpParams()
      .append('email', this.formGroup.value.email)
      .append('old-password', this.formGroup.value.old_password)
      .append('new-password', this.formGroup.value.password)
      .append('authorization', 'passing');
    return params;
  }

  postRequest(params: HttpParams) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return this.http
      .post<any>(environment.serverURL + '/auth/login', '', {
        headers: headers,
        observe: 'response',
        params: params,
      })
      .subscribe({
        next: (response) => {
          if (response.ok) {
            if (response.body == 'Changing the password succeeded.') {
              //redirects to dashboard-page
              this.router.navigate(['/']);
              if (isDevMode()) {
                console.log(
                  'Password change succeded! Server response: ' + response.body
                );
              }
            } else {
              this.openDialog(
                'Password change did not succeded!',
                'Server response: ' + response.body
              );
              if (isDevMode()) {
                console.log(
                  'Password change did not succeded! Server response: ' +
                    response.body
                );
              }
            }
          }
        },
        error: (error) => {
          if (isDevMode()) {
            console.log(error);
          }
        },
      });
  }
  //opens a PopUp window of class InformationPopUpComponent
  openDialog(header: string, text: string) {
    this.dialogRef.open(InformationPopUpComponent, {
      data: {
        header: header,
        text: text,
      },
    });
  }
  // handling errors by validators
  matchingError(): boolean {
    return this.formGroup.errors != null && this.formGroup.errors['noMatch'];
  }

  passwordStrengthError(): string {
    const err = this.password.errors;
    if (err == null || !err['passwordStrength']) {
      return '';
    }

    if (err['passwordStrengthLength']) {
      return 'lengthError';
    }
    if (err['passwordStrengthUpperCase']) {
      return 'uppercaseError';
    }
    if (err['passwordStrengthLowerCase']) {
      return 'lowercaseError';
    }
    if (err['passwordStrengthNumeric']) {
      return 'numericError';
    }

    return '';
  }
}

export function createMatchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirm = control.get('confirm');

    if (
      password == null ||
      confirm == null ||
      password.value != confirm.value
    ) {
      return { noMatch: true };
    }

    return null;
  };
}

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.length < 8) {
      return { passwordStrength: true, passwordStrengthLength: true };
    }
    // has uppercase
    if (!/[A-Z]+/.test(value)) {
      return { passwordStrength: true, passwordStrengthUpperCase: true };
    }

    // has lowercase
    if (!/[a-z]+/.test(value)) {
      return { passwordStrength: true, passwordStrengthLowerCase: true };
    }

    // has numeric
    if (!/[0-9]+/.test(value)) {
      return { passwordStrength: true, passwordStrengthNumeric: true };
    }

    return null;
  };
}
