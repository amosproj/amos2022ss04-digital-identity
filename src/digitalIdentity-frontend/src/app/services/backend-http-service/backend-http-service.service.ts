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
}
