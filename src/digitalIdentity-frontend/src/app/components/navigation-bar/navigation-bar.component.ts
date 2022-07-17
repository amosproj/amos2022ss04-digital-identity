import { Component, OnInit } from '@angular/core';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { NavigationEnd, Router } from '@angular/router';

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
  selectedSubMenu!: MenuItem;

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
    {
      displayName: 'Credential Definition',
      children: [
        {
          displayName: 'Overview of credential definitions',
          route: '/credDef-overview',
        },
        {
          displayName: 'Create new credential definition',
          route: '/create-credDef',
        },
      ],
    },
    {
      displayName: 'Proof Template',
      children: [
        {
          displayName: 'Overview of proof templates',
          route: '/proofTemplate-overview',
        },
        {
          displayName: 'Create new proof template',
          route: '/create-proofTemplate',
        },
      ],
    },
  ];

  constructor(
    private backendHttpService: BackendHttpService,
    private router: Router
  ) {}

  async ngOnInit() {
    let isLoggedIn = await this.backendHttpService.isLoggedIn();
    if (!isLoggedIn && !(this.router.url == `/password/change`)) {
      this.router.navigateByUrl('/login');
    }
    this.router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        this.menuItems.forEach((menu) => {
          if (menu.children !== undefined) {
            menu.children.forEach((subMenu) => {
              if (subMenu.route === this.router.url) {
                this.onSelect(menu);
              }
            });
          }
        });
      }
    });
  }

  onSelect(menuItem: MenuItem): void {
    this.selectedMenuItem = menuItem;
    this.router.events.subscribe((val) => {
      if (this.selectedMenuItem!.children !== undefined) {
        this.selectedMenuItem!.children.forEach((subMenu) => {
          if (subMenu.route === this.router.url) {
            this.selectedSubMenu = subMenu as MenuItem;
          }
        });
      }
    });
    console.log(this.selectedMenuItem);
  }

  newTab(event :any ) {
    console.log(event)
    event.preventDefault();
    // if (event.which() == 2) {
      window.open(this.router.url, '_blank');
    // }
    return false;
  }

  logout() {
    this.backendHttpService.logout();
  }
}
