import { Component, OnInit } from '@angular/core';

export interface MenuItem {
  displayName: string;
  iconName: string;
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
      iconName: 'star_rate',
      route: '/',
    },
    {
      displayName: 'Digital Identity',
      iconName: 'star_rate',
      children: [
        {
          displayName: 'Overview of Digital Identities',
          iconName: 'star_rate',
          route: '/DI-Overview',
        },
        {
          displayName: 'Create new Digital Identity',
          iconName: 'star_rate',
          route: '/create-new-DI',
        },
      ],
    },
    {
      displayName: 'Schema',
      iconName: 'star_rate',
      children: [
        {
          displayName: 'Overview of schemas',
          iconName: 'star_rate',
          route: '/schema-overview',
        },
        {
          displayName: 'Create new schema',
          iconName: 'star_rate',
          route: '/create-schema',
        },
      ],
    },
    {
      displayName: 'Credential Definition',
      iconName: 'star_rate',
      children: [
        {
          displayName: 'Overview of credential definitions',
          iconName: 'star_rate',
          route: '/credDef-overview',
        },
        {
          displayName: 'Create new credential definition',
          iconName: 'star_rate',
          route: '/create-credDef',
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
