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
    private router: Router,
    private HttpService: BackendHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log('Debug', params);
      let email = params['email'];

      this.formGroup.get('email')?.patchValue(email);
    });
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
      let params = new HttpParams()
        .append('email', this.formGroup.value.email)
        .append('password', this.formGroup.value.password);
      this.loginPostRequest(params);
    }
  }

  // POST request to backend
  loginPostRequest(params: HttpParams) {
    this.HttpService.postRequest(
      'login',
      '/auth/login',
      this.formGroup.value,
      params
    )
      .then((response) => {
        if (!response.ok) {
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Process failed',
              text: 'Error ' + response.status + ' \n' + response.error,
            },
          });
        } else if (response.body == 'Login successful.') {
          this.router.navigate(['/']);
        } else {
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Not successful',
              text: response.body,
            },
          });
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
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

  openForgotPassword() {
    this.dialogRef.open(ForgotPasswordPopUpComponent, {});
    console.log('open done');
  }
}
