import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, timeout } from 'rxjs';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BackendHttpService {
  headers = new HttpHeaders().append('Content-Type', 'application/json');
  authenticated = false;

  constructor(private http: HttpClient, 
      private router: Router,
      private dialogRef: MatDialog,
      private cookieService: CookieService) {
  }

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

            this.dialogRef.open(InformationPopUpComponent, {
              data: {
                header: 'Process failed',
                text: 'Error ' + error.status + ' \n' + error.error,
              },
            });
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

          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Process failed',
              text: 'Error ' + error.status + ' \n' + error.error,
            },
          });
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
    let credentials = {username: 'jf_v@gmx.de', password: '}3CB=Ns8&=K~!+1*8w61'};
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
          if (response.ok && isDevMode()) {
            console.log(processName + ' successful! Server response:');
            console.log(response);
            resolve(response);
          } else {
            if (isDevMode()) {
              console.log(processName + ' not successful! Got Error message:');
              console.log(response);
            }
            const error = <HttpErrorResponse>(<any>response);

            this.dialogRef.open(InformationPopUpComponent, {
              data: {
                header: 'Process failed',
                text: 'Error ' + response.status + ' \n' + error.error,
              },
            });
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

          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Process failed',
              text: 'Error ' + error.status + ' \n' + error.error,
            },
          });
          reject(error);
        },
      })
    );
    return promise;
  }



  async authenticate(credentials: any, callback: any) {
    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get(environment.serverURL + `/auth/login`, {headers: headers}).subscribe({
      next: (result) => {
        if (result) {
          this.authenticated = true;
          return callback && callback();
        }
      },
      error: () => {
        this.authenticated = false;
        this.dialogRef.open(InformationPopUpComponent, {
          data: {
            header: 'Login not successful!',
          },
        });
      }
    }
      
    );
   

  }

  async isLoggedIn() {
    let loggedIn = true
    try {
      await lastValueFrom(this.http.get(environment.serverURL + `/auth/login`));
    } catch {
      loggedIn = false;
    }
    return loggedIn; 
    // return true;
  }

  async logout() {
    this.http.post(environment.serverURL + '/logout', {}).subscribe(() => {
      this.authenticated = false;
      this.router.navigateByUrl('/login');
  });
  }


}
