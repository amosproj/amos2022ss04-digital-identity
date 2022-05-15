import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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

  constructor() { }

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
        required: true,
        value: undefined
      },
      {
        key: "surname",
        label: "Surname",
        placeholder: "Doe",
        required: true,
        value: undefined
      },
      {
        key: "birthday",
        label: "Birthday",
        placeholder: "01.01.1980",
        required: true,
        value: ""
      },
      {
        key: "email",
        label: "Email",
        placeholder: "john.doe@example.org",
        required: true,
        value: undefined
      },
      {
        key: "user_role",
        label: "User role",
        placeholder: "john.doe@example.org",
        required: true,
        options: [
          { value: "basic_employee", viewValue: "Basic employee" },
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
        required: true,
        value: undefined
      },
      {
        key: "team",
        label: "Team",
        placeholder: "Lehrstuhl 4",
        required: false,
        value: undefined
      }
    ];
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  registerProcess(): void {
    if (this.formGroup.valid) {
      var formGroup = this.formGroup
      var personal_information = this.personal_information

      this.personal_information.forEach(function (pi, index: number) {
        if (pi.key == 'birthday') {
          var test = new DatePipe('en').transform(formGroup.value[pi.key], 'dd/MM/yyyy');
          if (test == null) {
            personal_information[index].value = ""
          }
          else {
            personal_information[index].value = test
          }
        }
        else {
          personal_information[index].value = formGroup.value[pi.key]
        }
      })
    }
  }

}
