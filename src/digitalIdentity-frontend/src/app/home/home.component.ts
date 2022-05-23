import { Component, OnInit } from '@angular/core';
//my importation

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  //what l added

  logo1!: string;
  logo2!: string;

  clicked(str:string) : void {
    console.log("goto " + str);
  }

  ngOnInit() {
    this.logo1 = `./images/DIdentity.png`;
    this.logo2 = `../images/adorsys.png`;
  }
}
