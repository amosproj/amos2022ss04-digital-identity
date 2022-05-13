import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  formGroup: FormGroup = this.initForm();
  hide: boolean = false;

  email: string = ""
  password: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.email = this.formGroup.value.email
      this.password = this.formGroup.value.password
    }
  }
}