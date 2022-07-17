import { Component, isDevMode, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

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
  homeItem : MenuItem;

  public menuItems: MenuItem[] = [
    {
      displayName: 'Home',
      route: '/'
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
  ) {
    this.homeItem = <MenuItem>this.getHomeItem();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.menuItems.forEach((menu) => {
          if (menu.children !== undefined) {
            menu.children.forEach((subMenu) => {
              if (subMenu.route === this.router.url) {
                this.onSelect(menu);
              }
            });
          }
          else if (menu.displayName == 'Home') {
            this.onSelect(menu);
          }
        });
      }
    });

  }

  async ngOnInit() {
    let isLoggedIn = await this.backendHttpService.isLoggedIn();
    if (!isLoggedIn && !(this.router.url == `/password/change`)) {
      this.router.navigateByUrl('/login');
    }
  }

  getHomeItem () {
    return this.menuItems.find((x) => x.displayName == 'Home');
  }


  onSelect(menuItem: MenuItem): void {
    if (menuItem != undefined) {
      this.selectedMenuItem = menuItem;
      this.router.events.subscribe((val) => {
        if (this.selectedMenuItem!.children !== undefined) {
          this.selectedMenuItem!.children.forEach((subMenu) => {
            if (subMenu.route === this.router.url) {
              this.selectedSubMenu = subMenu as MenuItem;
              this.closeMenu()
            }
          });
        }
      });
    }
    // console.log(this.selectedMenuItem);
  }

  //used to close MatMenu after selecting an item
  @ViewChildren(MatMenuTrigger) trigger: QueryList<MatMenuTrigger> = new QueryList<MatMenuTrigger>();
  closeMenu() {
    this.trigger.forEach((x)=> x.closeMenu());
  }

  handleMouseEvent(event:any, item:any = undefined) {
    if (isDevMode()) {console.log('MouseEvent', event, item) }
    if (event) {
      event.preventDefault();
      switch (event.button) {
        //left mouse button
        case 0: if (item != undefined) {
            if (event.ctrlKey) {
              this.openNewTab(item.route)
            }
            else {
              this.onSelect(item);
            };
          };
          break;
        //middle mouse button
        case 1: if (item != undefined) {this.openNewTab(item.route)}; break;
        //right mouse button
        case 2:  break;
      }
    }
  }

  openNewTab(route:any) {
    window.open(route, '_blank');
  }

  logout() {
    this.backendHttpService.logout();
  }
}
