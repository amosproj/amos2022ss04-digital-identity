import { Component, isDevMode, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InformationPopUpComponent } from '../information-pop-up/information-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';


@Component({
  selector: 'app-createDI-page',
  templateUrl: './createDI-page.component.html',
  styleUrls: ['./createDI-page.component.css'],
})
export class CreateDIPageComponent implements OnInit {
  personal_information = this.initPersonalInformation();
  formGroup: FormGroup = this.initForm();

  constructor(private http: HttpClient, private dialogRef: MatDialog, private HttpService: BackendHttpService) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    var formControls: { [id: string]: FormControl } = {};

    this.personal_information.forEach(function (pi) {
      if (pi.key == 'email') {
        formControls[pi.key] = new FormControl('', [
          Validators.email,
          Validators.required,
        ]);
      } else if (pi.required)
        formControls[pi.key] = new FormControl('', Validators.required);
      else formControls[pi.key] = new FormControl('');
    });

    return new FormGroup(formControls);
  }

  initPersonalInformation() {
    return [
      {
        key: 'name',
        label: 'Name',
        placeholder: 'John',
        required: true,
      },
      {
        key: 'surname',
        label: 'Surname',
        placeholder: 'Doe',
        required: true,
      },
      {
        key: 'email',
        label: 'Email',
        placeholder: 'john.doe@example.org',
        required: true,
      },
      // {
      //   key: 'user_role',
      //   label: 'User role',
      //   placeholder: 'john.doe@example.org',
      //   required: true,
      //   options: [
      //     { value: 'guest', viewValue: 'Guest' },
      //     { value: 'employee', viewValue: 'Employee' },
      //     { value: 'hr_employee', viewValue: 'HR Employee' },
      //     // admin role exists but can not be added via the web app.
      //   ],
      //   value: undefined,
      // },
    ];
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  registerButtonEvent(): void {
    if (this.formGroup.valid) {
      let params = this.fetchPersonalInformation();
      this.registerPostRequest(params);
    }
  }

  fetchPersonalInformation(): HttpParams {
    if (this.formGroup.valid) {
      let formGroup = this.formGroup;
      let params = new HttpParams();
      this.personal_information.forEach(function (pi, index: number) {
        params = params.append(pi.key, formGroup.value[pi.key]);
      });
      params = params.append('authorization', 'passing');
      return params;
    }
    return new HttpParams();
  }

  // POST request to backend
  async registerPostRequest(params: HttpParams) {
    let response = await this.HttpService.postRequest("create DI","/auth/register",this.formGroup.value,params)
    .then(
                  answer => {
                    console.log(answer)
                    if (!(<HttpResponse<any>>answer).ok) {
                    this.dialogRef.open(InformationPopUpComponent, {
                              data: {
                                header: "Process failed",
                                text: "Error " + answer.status + " \n" + answer.error,
                              },
                            });}})
    .catch(answer => {console.log("error"); console.log(answer)})
                    // if (!(<HttpResponse<any>>answer).ok) {
                    //     this.dialogRef.open(InformationPopUpComponent, {
                    //               data: {
                    //                 header: "Process failed",
                    //                 text: answer.body,
                    //               },
                    //             });
                    //   }})
    // .then((answer)=>{
    //                 if (!answer.ok) {
    //                   this.dialogRef.open(InformationPopUpComponent, {
    //                             data: {
    //                               header: "Process failed",
    //                               text: answer.body,
    //                             },
    //                           });
    //                 }})
    //               .catch((answer)=>{console.log("test2")})
    // console.log("response:")
    // console.log(response)
    // if (!response.ok) {
    //   this.dialogRef.open(InformationPopUpComponent, {
    //             data: {
    //               header: "Process failed",
    //               text: response.body,
    //             },
    //           });
    // }
    // const headers = new HttpHeaders().append(
    //   'Content-Type',
    //   'application/json'
    // );
    // let body = JSON.stringify(this.formGroup.value);
    // console.log(body)
    // // JSON.parse(body).forEach((key:string,value:string) => console.log(key +" " + value))
    // console.log(JSON.parse(body)[0])
    // return this.http
    //   .post<any>(environment.serverURL + '/auth/register', body, {
    //     headers: headers,
    //     observe: 'response',
    //     params: params,
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       if (response.ok && isDevMode()) {
    //         console.log('Registration successful! Server response:');
    //         console.log(response);
    //       } else {
    //         if (isDevMode()) {
    //           console.log('Error:');
    //           console.log(response);
    //         }
    //       }
    //     },
    //     error: (error) => {
    //       if (isDevMode()) console.log(error);
    //       this.dialogRef.open(InformationPopUpComponent, {
    //         data: {
    //           header: "Process failed",
    //           text: error.error,
    //         },
    //       });
    //     },
    //   });
  }
}
