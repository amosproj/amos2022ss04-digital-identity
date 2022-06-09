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
  hide_new: boolean = true;
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        old_password: new FormControl('', Validators.required),
        new_password: new FormControl('', Validators.required),
        renew_password: new FormControl('', Validators.required),
      },
      matchPassword()
    );
  }

  ngOnInit(): void {}

  log() {
    if (this.formGroup.errors == null) {
      console.log('no errors');
    } else if (this.formGroup.errors['noMatch']) {
      console.log('no match');
    } else {
      console.log('other errors');
    }
  }
}

export function matchPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('new_password');
    const confirm = control.get('renew_password');

    console.log(control);
    console.log(password);
    if (password != null) {
      console.log('password', password.value);
    }
    console.log(confirm);
    if (confirm != null) {
      console.log('confirm', confirm.value);
    }

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
