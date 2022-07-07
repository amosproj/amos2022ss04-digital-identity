import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

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
  selectedSubMenu!: MenuItem;

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

  constructor(private router:Router) {

  }

  ngOnInit(): void {
    console.log(this.router)
    this.router.events.subscribe((val) => {
      // see also
      if(val instanceof NavigationEnd){
        this.menuItems.forEach((menu)=>{
          if(menu.children !== undefined){
            menu.children.forEach((subMenu)=>{

              if(subMenu.route === this.router.url){
                this.onSelect(menu);
              }

            })
          }
        })
      }

      console.log()
    });

  }

  onSelect(menuItem: MenuItem): void {
    this.selectedMenuItem = menuItem;
    this.router.events.subscribe((val) => {
      if(this.selectedMenuItem!.children !== undefined){
        this.selectedMenuItem!.children.forEach((subMenu)=>{
          if(subMenu.route === this.router.url){
            this.selectedSubMenu = subMenu as MenuItem;
          }
        })
      }
    })

    console.log(this.selectedMenuItem);
  }
  
}
