import { Component } from '@angular/core';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  clicked(str:string) : void {
    console.log("goto " + str)
  }
}
