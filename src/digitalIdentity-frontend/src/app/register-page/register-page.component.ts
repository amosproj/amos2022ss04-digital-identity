import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  personal_information = [
    {
      description: "name",
      value: "name",
      example: "John"
    },
    {
      description: "surname",
      value: "surname",
      example: "Doe"
    },
    {
      description: "e-mail",
      value: "e-mail",
      example: "john.doe@example.org"
    }


  ]
}