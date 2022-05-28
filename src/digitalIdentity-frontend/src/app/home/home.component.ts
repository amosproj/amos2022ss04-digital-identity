import { Component, isDevMode, OnInit } from '@angular/core';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  logo1!: string;
  logo2!: string;

  clicked(str:string) : void {
    if (isDevMode())console.log("goto " + str);
  }

  ngOnInit() {
    this.logo1 = `./images/DIdentity.png`;
    this.logo2 = `../images/adorsys.png`;
  }
}
