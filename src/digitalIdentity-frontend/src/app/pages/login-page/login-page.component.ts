import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InformationPopUpComponent } from '../../shared/pop-up/information-pop-up/information-pop-up.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { ForgotPasswordPopUpComponent } from 'src/app/shared/pop-up/forgot-password-pop-up/forgot-password-pop-up.component';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  personal_information = [{}];
  formGroup: FormGroup = this.initForm();
  hide: boolean = true;

  constructor(
    public dialogRef: MatDialog,
    public router: Router,
    public httpService: BackendHttpService,
    public route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      let email = params['email'];

      this.formGroup.get('email')?.patchValue(email);
    });

    let loggedIn = await this.httpService.isLoggedIn();
    if (loggedIn) {
      this.router.navigateByUrl("/");
    }
  }

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.formGroup.value.email = this.formGroup.value.email.toLowerCase();
      let credentials = {username: this.formGroup.value.email, password: this.formGroup.value.password};
      this.httpService.authenticate(credentials, () => {
        this.router.navigateByUrl(`/`);
      });
    }
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

  openForgotPassword() {
    this.dialogRef.open(ForgotPasswordPopUpComponent, {});
  }
}
