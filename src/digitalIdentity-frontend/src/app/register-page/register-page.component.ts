import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  personal_information = this.initPersonalInformaion();
  formGroup: FormGroup = this.initForm();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    var formControls: { [id: string]: FormControl } = {}

    this.personal_information.forEach(function (pi) {
      if (pi.required)
        formControls[pi.key] = new FormControl('', Validators.required);
      else
        formControls[pi.key] = new FormControl('');
    });

    return new FormGroup(formControls);
  }

  initPersonalInformaion() {
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
        value: undefined
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
        personal_information[index].value = formGroup.value[pi.key]
      })
    }
  }

}