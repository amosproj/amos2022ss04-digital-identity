import { Component, OnInit } from '@angular/core';

export interface MenuItem {
  displayName: string;
  route?: string;
  children?: MenuItem[];
}

export interface MenuIndex {
  submenuIndex: number;
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  public selectedMenuItem?: MenuItem;

  public menuItems: MenuItem[] = [
    {
      displayName: 'Home',
      route: '/',
    },
    {
      displayName: 'Digital Identity',
      children: [
        {
          displayName: 'Overview of Digital Identities',
          route: '/DI-Overview',
        },
        {
          displayName: 'Create new Digital Identity',
          route: '/create-new-DI',
        },
      ],
    },
    {
      displayName: 'Schema',
      children: [
        {
          displayName: 'Overview of schemas',
          route: '/schema-overview',
        },
        {
          displayName: 'Create new schema',
          route: '/create-schema',
        },
      ],
    },

  ];

  constructor() {}

  ngOnInit(): void {}

  onSelect(menuItem: MenuItem): void {
    this.selectedMenuItem = menuItem;
  }
}
