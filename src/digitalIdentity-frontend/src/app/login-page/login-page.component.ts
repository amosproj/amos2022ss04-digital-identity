import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule, HttpRequest, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.email = this.formGroup.value.email
      this.password = this.formGroup.value.password

      this.loginRequest()
    }
  }


  // POST request to backend
  loginRequest() {
    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams()
    .append('email', this.formGroup.value.email)
    .append('password', this.formGroup.value.password);
    let body = JSON.stringify(this.formGroup.value)

    return this.http.post<any>(environment.serverURL+'/auth/login', body, {headers: headers, params: params})
      .subscribe(
        (response) => {
          //console.log(response);
          if(response == "success") {
            // TODO redirect to dashboard-page
            console.log("Login successful! Server response: " + response);
          } else {
            console.log("Login not successful! Server response: " + response);
          }
        },
        (error) => console.log(error)
      )
  }

}
