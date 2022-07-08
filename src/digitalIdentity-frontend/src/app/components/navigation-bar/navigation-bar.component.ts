import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

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
    {
      displayName: 'Proof Template',
      iconName: 'star_rate',
      children: [
        {
          displayName: 'Overview of proof templates',
          iconName: 'star_rate',
          route: '/proofTemplate-overview',
        },
        {
          displayName: 'Create new proof template',
          iconName: 'star_rate',
          route: '/create-proofTemplate',
        },
      ],
    },
  ];

  constructor(private backendHttpService: BackendHttpService,
        private router: Router) {}

  async ngOnInit() {
    let isLoggedIn = await this.backendHttpService.isLoggedIn();
    if (!isLoggedIn && !(this.router.url == `/password/change`)) {
      this.router.navigateByUrl("/login");
    }
  }

  onSelect(menuItem: MenuItem): void {
    this.selectedMenuItem = menuItem;
  }

  logout() {
    this.backendHttpService.logout();
  }
}
