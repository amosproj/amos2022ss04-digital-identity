import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InformationPopUpComponent } from '../information-pop-up/information-pop-up.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  personal_information = [{}];
  formGroup: FormGroup = this.initForm();
  hide: boolean = false;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
      let params: HttpParams = this.fetchLoginInformation();
      this.loginPostRequest(params);
    }
  }

  fetchLoginInformation(): HttpParams {
    if (this.formGroup.valid) {
      let params = new HttpParams()
        .append('email', this.formGroup.value.email)
        .append('password', this.formGroup.value.password);
      return params;
    }
    return new HttpParams();
  }

  // POST request to backend
  loginPostRequest(params: HttpParams) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    let body = JSON.stringify(this.formGroup.value);

    return this.http
      .post<any>(environment.serverURL + '/auth/login', body, {
        headers: headers,
        observe: 'response',
        params: params,
      })
      .subscribe({
        next: (response) => {
          if (response.ok) {
            if (response.body == 'success') {
              //redirects to dashboard-page
              this.router.navigate(['/']);
              if (isDevMode()) {
                console.log(
                  'Login successful! Server response: ' + response.body
                );
              }
            } else {
              this.openDialog(
                'Login not successful!',
                'Server response: ' + response.body
              );
              if (isDevMode()) {
                console.log(
                  'Login not successful! Server response: ' + response.body
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
}
