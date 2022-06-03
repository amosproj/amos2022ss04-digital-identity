import { DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

function dateRangeValidator(min: Date, max: Date): ValidatorFn {
  return (control) => {
    if (!control.value) return null;
    const dateValue = new Date(control.value);

    if ((min && dateValue < min) || (max && dateValue > max)) {
      return { message: 'date not in range' };
    }
    return null;
  };
}

export interface answer {
  id: number;
  name: string;
  surname: string;
  email: string;
  openCredentials: number;
  openProofs: number;
  connectionStatus: boolean;
  details: {};
}

@Component({
  selector: 'app-edit-window-pop-up',
  templateUrl: './edit-window-pop-up.component.html',
  styleUrls: ['./edit-window-pop-up.component.css'],
})
export class EditWindowPopUpComponent implements OnInit {
  formFilled: boolean = true;
  cancelButtonString: string = 'Cancel';
  personal_information;
  personalInf: answer = {
    id: NaN,
    name: '',
    surname: '',
    email: '',
    openCredentials: NaN,
    openProofs: NaN,
    connectionStatus: false,
    details: {},
  };
  formGroup: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);
  startDate = new Date(1990, 0, 1);
  id: string;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<EditWindowPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: string }
  ) {
    if (isDevMode()) {
      this.cancelButtonString = 'Ney!';
    }
    this.id = data.id;

    this.personal_information = this.initPersonalInformation(this.personalInf);
    this.formGroup = this.initForm();
    this.init();
  }

  init() {
    var httpAnswer = this.getPersonalInformation(this.id).subscribe({
      next: (next: HttpResponse<any>) => {
        if (next.ok) {
          if (isDevMode()) {
            console.log('Got server response:');
            console.log(next);
          }
          this.personalInf = next.body;
          this.personal_information = this.initPersonalInformation(
            this.personalInf
          );
          this.formGroup = this.initForm();
        } else {
          if (isDevMode()) {
            console.log('Error:');
            console.log(next);
          }
        }
      },
      error: (error) => {
        if (isDevMode()) {
          console.log('Error in HTTP request:');
          console.log(error);
        }
      },
    });
  }

  ngOnInit(): void {}

  cancelButtonEvent() {
    this.checkIfRequiredFieldsAreFilled();
    if (isDevMode()) {
      console.log('Cancel => close window');
    }
    this.dialogRef.close();
  }

  editButtonEvent() {
    if (this.checkIfRequiredFieldsAreFilled()) {
      let params: HttpParams = this.fetchPersonalInformation();
      this.updatePostRequest(params);
      if (isDevMode()) {
        console.log('Edit => close window');
      }
      this.dialogRef.close();
      window.location.reload();
    }
  }

  fetchPersonalInformation(): HttpParams {
    if (this.formGroup.valid) {
      let formGroup = this.formGroup;
      let params = new HttpParams();
      this.personal_information.forEach(function (pi, index: number) {
        if (pi.key == 'birthday') {
          let tempValue = new DatePipe('en').transform(
            formGroup.value[pi.key],
            'dd/MM/yyyy'
          ); //may be null
          if (tempValue != null) {
            params = params.append(pi.key, tempValue);
          }
        } else {
          params = params.append(pi.key, formGroup.value[pi.key]);
        }
      });
      return params;
    }
    return new HttpParams();
  }

  initPersonalInformation(personalInfoJson: answer) {
    return [
      {
        key: 'id',
        label: 'ID',
        required: true,
        value: personalInfoJson.id,
      },
      {
        key: 'name',
        label: 'Name',
        required: true,
        value: personalInfoJson.name,
      },
      {
        key: 'surname',
        label: 'Surname',
        required: true,
        value: personalInfoJson.surname,
      },
      {
        key: 'email',
        label: 'Email',
        required: true,
        value: personalInfoJson.email,
      },
    ];
  }

  initForm(): FormGroup {
    var formControls: { [id: string]: FormControl } = {};
    var minDate = this.minDate;
    var maxDate = this.maxDate;

    this.personal_information.forEach(function (pi) {
      if (pi.key == 'email') {
        formControls[pi.key] = new FormControl('', [
          Validators.email,
          Validators.required,
        ]);
      } else if (pi.key == 'birthday') {
        formControls[pi.key] = new FormControl('', [
          Validators.required,
          dateRangeValidator(minDate, maxDate),
        ]);
      } else if (pi.required) {
        formControls[pi.key] = new FormControl('', Validators.required);
      } else {
        formControls[pi.key] = new FormControl('');
      }
      formControls[pi.key].setValue(pi.value);
    });

    return new FormGroup(formControls);
  }

  checkIfRequiredFieldsAreFilled(): boolean {
    for (let elem of this.personal_information) {
      if (this.formGroup.value[elem.key] == '') {
        this.formFilled = false;
        return false;
      }
    }
    this.formFilled = true;
    return true;
  }

  getPersonalInformation(id: string) {
    //TODO get the personal information to the connection from the backend
    var id_number: number = Number(id);
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const param = new HttpParams()
      .append('id', id_number)
      .append('authorization', 'passing');
    return this.http.get<HttpResponse<any>>(
      environment.serverURL + '/connection/' + id,
      { headers: header, observe: 'response', params: param }
    );
  }

  updatePostRequest(params: HttpParams) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    let body = JSON.stringify(this.formGroup.value);
    return this.http
      .post<any>(environment.serverURL + '/auth/update', body, {
        headers: headers,
        observe: 'response',
        params: params,
      })
      .subscribe({
        next: (response) => {
          if (isDevMode()) {
            console.log('Edit successful! Server response:');
            console.log(response.body);
          }
        },
        error: (error) => {
          if (isDevMode()) {
            console.log('Error in HTTP request:');
            console.log(error);
          }
        },
      });
  }
}
