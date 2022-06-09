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

  constructor() {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        old_password: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirm: new FormControl('', Validators.required),
      },
      createMatchPasswordValidator()
    );
  }

  ngOnInit(): void {}

  matchingError(): boolean{
    return this.formGroup.errors != null && this.formGroup.errors['noMatch']; 
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
