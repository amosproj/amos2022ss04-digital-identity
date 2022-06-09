import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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

  constructor() {
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
