import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { AddDIToCredentialPopUpComponent } from '../../../shared/pop-up/add-dito-credential-pop-up/add-dito-credential-pop-up.component';
import { CredDefDetailPopUpComponent } from 'src/app/components/cred-def-detail/cred-def-detail-pop-up/cred-def-detail-pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credential-overview-page',
  templateUrl: './credDef-overview-page.component.html',
  styleUrls: ['./credDef-overview-page.component.css'],
})
export class CredDefOverviewPageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService,
    public router: Router
  ) {
    this.initTable();
  }
  displayedColumnNames: string[] = ['Name', 'Status', 'Expand', 'Send to DI']; //prettier-ignore
  internalColumnNames: string[] = ['alias', 'active', 'button', 'button']; //prettier-ignore
  displayedColSelectNames: string[] = ['All', 'Name', 'Status']; //prettier-ignore
  internalColSelectNames: string[] = ['all', 'alias', 'active']; //prettier-ignore

  diData: any[] = [];

  credDefData: any[] = [];
  dataLoaded: boolean = false;
  selection: any[] = [];

  ngOnInit(): void {}

  openCredDefExpandedWindow(
    idx: number,
    credDefData: any[],
    dialogRef: MatDialog
  ) {
    if (isDevMode()) {
      console.log('Expand');
    }
    dialogRef.open(CredDefDetailPopUpComponent, {
      data: {
        credDef: credDefData[idx],
      },
    });
  }

  openAddDIWindow(idx: number, credDefData: any[], dialogRef: MatDialog) {
    if (isDevMode()) {
      console.log('open AddDI window');
    }
    dialogRef.open(AddDIToCredentialPopUpComponent, {
      data: {
        id: credDefData[idx].id,
        schemaId: credDefData[idx].schemaId,
        alias: credDefData[idx].alias,
      },
    });
  }

  initTable() {
    const params = new HttpParams();
    this.httpService
      .getRequest(
        'Get all credential definitions',
        '/credential-definition/all',
        params
      )
      .then((response) => {
        if (response.ok) {
          this.credDefData = response.body;
          this.dataLoaded = true;
        }
      })
      .catch(() => {});
  }

  handleMouseEvent(event: any, routerLink: string) {
    if (event) {
      event.preventDefault();
      switch (event.button) {
        //left mouse button
        case 0:
          if (event.ctrlKey) {
            this.openNewTab(routerLink);
          } else if (event.shiftKey) {
            this.openNewWindow(routerLink);
          } else {
            this.router.navigateByUrl(routerLink);
          }
          break;
        //middle mouse button
        case 1:
          this.openNewTab(routerLink);
          break;
        //right mouse button
        case 2:
          break;
      }
    }
  }

  openNewTab(route: any) {
    window.open(route, '_blank');
  }

  openNewWindow(route: any) {
    window.open(
      route,
      '_blank',
      'location=yes,height=1920,width=1024,scrollbars=yes,status=yes'
    );
  }
}
