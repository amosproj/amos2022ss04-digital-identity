import { Component, isDevMode, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { InformationPopUpComponent } from '../../../shared/pop-up/information-pop-up/information-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-createDI-page',
  templateUrl: './createDI-page.component.html',
  styleUrls: ['./createDI-page.component.css'],
})
export class CreateDIPageComponent implements OnInit {
  personal_information;
  formGroup: FormGroup;
  requestInProgress: boolean;

  constructor(
    private dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {
    // initialize personal_information and load placeholder data into it
    this.personal_information = this.initPersonalInformation();

    // initialize form with formControls (including validators)
    this.formGroup = this.initForm();

    this.requestInProgress = false;
  }

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
      {
        key: 'hr_employee',
        label: 'HR Employee',
        required: false,
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
      // fetch the entered information from the form and add it to the parameters for the http request
      let params = this.fetchPersonalInformation();
      this.registerPostRequest(params);
    }
  }

  fetchPersonalInformation(): HttpParams {
    if (this.formGroup.valid) {
      let formGroup = this.formGroup;
      let params = new HttpParams();
      formGroup.value.email = formGroup.value.email.toLowerCase();
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
      });
      params = params.append('authorization', 'passing');
      return params;
    }
    return new HttpParams();
  }

  // POST request to backend
  registerPostRequest(params: HttpParams) {
    this.requestInProgress = true;
    this.HttpService.postRequest(
      'create DI',
      '/connection/create',
      this.formGroup.value,
      params
    )
      .then((response) => {
        this.dialogRef.open(InformationPopUpComponent, {
          data: {
            header: 'Creating of DI was successful',
            text: 'Server response: ' + response.body,
          },
        });
        this.requestInProgress = false;
      })
      .catch((response) => {
        this.dialogRef.open(InformationPopUpComponent, {
          data: {
            header: 'Process failed',
            text: 'Error ' + response.status + ' \n' + response.error,
          },
        });
        this.requestInProgress = false;
      });
  }
}
