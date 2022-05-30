import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

function dateRangeValidator(min: Date, max: Date): ValidatorFn {
  return control => {
    if (!control.value) return null;
    const dateValue = new Date(control.value);

    if (min && dateValue < min || max && dateValue > max) {
      return { message: 'date not in range' };
    }
    return null;
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  personal_information = this.initPersonalInformation();
  formGroup: FormGroup = this.initForm();
  startDate = new Date(1990, 0, 1);
  maxDate = new Date();
  minDate = new Date(1900,0,1);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    var formControls: { [id: string]: FormControl } = {}
    var minDate = this.minDate
    var maxDate = this.maxDate

    this.personal_information.forEach(function (pi) {
      if (pi.key == 'email'){
        formControls[pi.key] = new FormControl('', [Validators.email, Validators.required]);
      }
      else if (pi.key == 'birthday') {
        formControls[pi.key] = new FormControl('', [Validators.required, dateRangeValidator(minDate,maxDate)]);
      }
      else if (pi.required)
        formControls[pi.key] = new FormControl('', Validators.required);
      else
        formControls[pi.key] = new FormControl('');
    });

    return new FormGroup(formControls);
  }

  initPersonalInformation() {
    return [
      {
        key: "name",
        label: "Name",
        placeholder: "John",
        required: true
      },
      {
        key: "surname",
        label: "Surname",
        placeholder: "Doe",
        required: true
      },
      {
        key: "birthday",
        label: "Birthday",
        placeholder: "01.01.1980",
        required: true
      },
      {
        key: "email",
        label: "Email",
        placeholder: "john.doe@example.org",
        required: true
      },
      {
        key: "user_role",
        label: "User role",
        placeholder: "john.doe@example.org",
        required: true,
        options: [
          { value: "guest", viewValue: "Guest" },
          { value: "employee", viewValue: "Employee" },
          { value: "hr_employee", viewValue: "HR Employee" }
          // admin role exists but can not be added via the web app.
        ],
        value: undefined
      },
      {
        key: "company",
        label: "Company",
        placeholder: "Friedrich-Alexander Universität",
        required: true
      },
      {
        key: "team",
        label: "Team",
        placeholder: "Lehrstuhl 4",
        required: false
      }
    ];
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  registerButtonEvent(): void {
    if (this.formGroup.valid) {
      let params = this.fetchPersonalInformation()
      this.registerPostRequest(params)
    }
  }

  fetchPersonalInformation() : HttpParams {
    if (this.formGroup.valid) {
      let formGroup = this.formGroup;
      let params = new HttpParams();
      this.personal_information.forEach(function (pi, index: number) {
        if (pi.key == 'birthday') {
          let tempValue = new DatePipe('en').transform(formGroup.value[pi.key], 'dd/MM/yyyy'); //may be null
          if (tempValue != null) {
            params = params.append(pi.key, tempValue)
          }
        }
        else {
          params = params.append(pi.key, formGroup.value[pi.key])
        }
      })
      return params
    }
    return new HttpParams()
  }

  // POST request to backend
  registerPostRequest(params: HttpParams) {
    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    let body = JSON.stringify(this.formGroup.value)
    return this.http.post<any>(environment.serverURL+'/auth/register', body, {headers:headers, observe:"response", params:params})
    .subscribe({
      next: (response) => {
          if (response.ok && isDevMode()) {
            console.log("Register successful! Server response:")
            console.log(response)
          }
          else {
            if (isDevMode()) {
              console.log("Error:")
              console.log(response)
            }
          }
      },
      error: (error) => {
        if (isDevMode()) console.log(error)
      }
    })
  }
}
