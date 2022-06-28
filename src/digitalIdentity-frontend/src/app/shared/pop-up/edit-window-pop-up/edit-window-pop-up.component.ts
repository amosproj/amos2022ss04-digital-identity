import { HttpParams } from '@angular/common/http';
import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

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
  userRole: string;
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
    userRole: 'employee',
    details: {},
  };
  formGroup: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);
  startDate = new Date(1990, 0, 1);
  id: string;

  constructor(
    public dialogRef: MatDialogRef<EditWindowPopUpComponent>,
    public HttpService: BackendHttpService,
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
    const params = new HttpParams()
      .append('id', Number(this.id))
      .append('authorization', 'passing');
    this.HttpService.getRequest('Edit', '/connection/' + this.id, params)
      .then((response) => {
        if (response.ok) {
          this.personalInf = response.body;
          this.personal_information = this.initPersonalInformation(
            this.personalInf
          );
          this.formGroup = this.initForm();
        } else {
        }
      })
      .catch((response) => {});
  }

  ngOnInit(): void {}

  cancelButtonEvent() {
    if (isDevMode()) {
      console.log('Cancel => close window');
    }
    this.dialogRef.close();
  }

  editButtonEvent() {
    if (this.formGroup.valid) {
      let params: HttpParams = this.fetchPersonalInformation();
      this.updatePostRequest(params);
    }
  }

  fetchPersonalInformation(): HttpParams {
    if (this.formGroup.valid) {
      let formGroup = this.formGroup;
      let params = new HttpParams();
      this.personal_information.forEach(function (pi, index: number) {
        if (pi.key == `hr_employee`) {
          if (formGroup.value[pi.key]) {
            params = params.append(`user_role`, `hr_employee`);
          } else {
            params = params.append(`user_role`, `employee`);
          }
        } else {
          params = params.append(pi.key, formGroup.value[pi.key]);
        }
        params = params.append(pi.key, formGroup.value[pi.key]);
      });
      params = params.append('authorization', 'passing');
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
      {
        key: 'hr_employee',
        label: 'HR Employee',
        required: false,
        value: personalInfoJson.userRole == `HR_EMPLOYEE`,
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

  updatePostRequest(params: HttpParams) {
    this.HttpService.postRequest(
      'edit DI',
      '/connection/update',
      this.formGroup.value,
      params
    )
      .then(() => {
        this.dialogRef.close();
        window.location.reload();
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }
}
