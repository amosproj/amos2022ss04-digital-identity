import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  links = ['/', '2', '3', '/DI-Overview', '/register', '/register'];
  titles = ['Home', 'Digital Identity', 'Schema', 'Overview of Digital Identities','Create new Digital Identityy'];
  activeLink = this.links[0];
  color:ThemePalette = `primary`;

  constructor() { }

  ngOnInit(): void {
  }


}
