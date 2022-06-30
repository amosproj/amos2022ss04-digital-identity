import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { catchError, Observable, of, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BackendHttpService {
  headers = new HttpHeaders().append('Content-Type', 'application/json');
  authenticated = false;

  constructor(private http: HttpClient) {}

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
          } // else
          if (isDevMode()) {
            console.log(
              processName + ' not successful! Got Error message:',
              response
            );
          }
          reject(response);
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
    this.authenticate(credentials);
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
          } else if (isDevMode()) {
            console.log(processName + ' not successful! Got Error message:');
            console.log(response);
          }
          resolve(response);
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
          reject(error);
        },
      })
    );
    return promise;
  }



  authenticate(credentials: any) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    console.log(headers);

    this.http.get(environment.serverURL, {headers: headers}).subscribe(response => {
      console.log("!122");
      console.log(response);
        // if (response['name']) {
        //     this.authenticated = true;
        // } else {
        //     this.authenticated = false;
        // }
        // return callback && callback();
    });
    console.log("!133");

}
}
