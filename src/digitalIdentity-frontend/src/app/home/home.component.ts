import { Component, isDevMode, OnInit } from '@angular/core';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clicked(str: string): void {
    if (isDevMode()) console.log('goto ' + str);
  }

  ngOnInit() {}
}
