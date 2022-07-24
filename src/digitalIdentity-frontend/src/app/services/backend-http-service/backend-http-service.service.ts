import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  // HttpUrlEncodingCodec,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { ErrorMessageService } from '../error-message-service/error-message.service';
@Injectable({
  providedIn: 'root',
})
export class BackendHttpService {
  headers = new HttpHeaders().append('Content-Type', 'application/json');
  authenticated = false;
  // TODO: use URL encoder to encode password
  // encoder: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorMessageService: ErrorMessageService
  ) {}

  async postRequest(
    processName: string,
    path: string,
    data: any,
    params: HttpParams
  ): Promise<any> {
    let body = JSON.stringify(data);

    let promise = await new Promise<HttpResponse<any>>((resolve, reject) =>
      (<Observable<HttpResponse<any>>>this.http
        .post<any>(environment.serverURL + path, body, {
          headers: this.headers,
          observe: 'response',
          params: params,
        })
        .pipe(
          timeout(20000),
          // timeout
          catchError((e) => {
            return of(e);
          })
        )).subscribe({
        next: (response) => {
          if (response.ok) {
            if (isDevMode()) {
              console.log(
                processName + ' successful! Server response:',
                response
              );
            }
            resolve(response);
          } else {
            if (isDevMode()) {
              console.log(
                processName + ' not successful! Got Error message:',
                response
              );
            }
            const error = <HttpErrorResponse>(<any>response);
            this.errorMessageService.openHttpErrorDialog(error);
            reject(response);
          }
        },
        error: (error) => {
          if (isDevMode()) {
            if (error.name == 'TimeoutError') {
              console.log(processName + ' timed out');
            } else {
              console.log(processName + ' not successful!: Error: ');
              console.log(error);
            }
          }

          this.errorMessageService.openHttpErrorDialog(error);
          reject(error);
        },
      })
    );
    return promise;
  }

  async getRequest(
    processName: string,
    path: string,
    params: HttpParams
  ): Promise<any> {
    let promise = await new Promise<HttpResponse<any>>((resolve, reject) =>
      (<Observable<HttpResponse<any>>>this.http
        .get<any>(environment.serverURL + path, {
          headers: this.headers,
          observe: 'response',
          params: params,
        })
        .pipe(
          timeout(20000),
          // timeout
          catchError((e) => {
            return of(e);
          })
        )).subscribe({
        next: (response) => {
          if (response.ok) {
            if (isDevMode()) {
              console.log(processName + ' successful! Server response:');
              console.log(response);
            }
            resolve(response);
          } else {
            if (isDevMode()) {
              console.log(processName + ' not successful! Got Error message:');
              console.log(response);
            }
            const error = <HttpErrorResponse>(<any>response);

            this.errorMessageService.openHttpErrorDialog(error);
            reject(response);
          }
        },
        error: (error) => {
          if (isDevMode()) {
            if (error.name == 'TimeoutError') {
              console.log(processName + ' timed out');
            } else {
              console.log(processName + ' not successful!: Error: ');
              console.log(error);
            }
          }

          this.errorMessageService.openHttpErrorDialog(error);
          reject(error);
        },
      })
    );
    return promise;
  }

  async authenticate(credentials: any, callback: any) {
    // TODO: encode password
    // let encoded_password: string = this.encoder.encodeKey(credentials.password);
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              // 'Basic ' + btoa(credentials.username + ':' + encoded_password),
              'Basic ' +
              btoa(credentials.username + ':' + credentials.password),
          }
        : {}
    );

    this.http
      .get(environment.serverURL + `/auth/login`, { headers: headers })
      .subscribe({
        next: (result) => {
          if (result) {
            this.authenticated = true;
            return callback && callback();
          }
        },
        error: (error) => {
          this.authenticated = false;
          if (error.status == 401) {
            this.errorMessageService.openCustomErrorDialog(
              'Email or password incorrect.',
              'Login not successful!'
            );
          } else {
            this.errorMessageService.openHttpErrorDialog(error);
          }
        },
      });
  }

  async isLoggedIn() {
    let loggedIn = true;
    try {
      await lastValueFrom(this.http.get(environment.serverURL + `/auth/login`));
    } catch {
      loggedIn = false;
    }
    return loggedIn;
  }

  async logout() {
    this.http.post(environment.serverURL + '/logout', {}).subscribe(() => {
      this.authenticated = false;
      this.router.navigateByUrl('/login');
    });
  }
}
