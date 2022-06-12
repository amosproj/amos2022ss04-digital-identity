import { Component, isDevMode, OnInit } from '@angular/core';

@Component({
  templateUrl: 'home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomeComponent implements OnInit {
  clicked(str: string): void {
    if (isDevMode()) console.log('goto ' + str);
  }

  ngOnInit() {}
}
