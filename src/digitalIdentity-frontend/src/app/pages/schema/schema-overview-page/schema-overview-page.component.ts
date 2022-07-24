import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { Router } from '@angular/router';
import { SchemaPopUpComponent } from 'src/app/pages/schema/schema-overview-page/schema-pop-up/schema-pop-up.component';

export interface attributeType {
  name: string;
  type: 'string' | 'date' | 'number';
}
export interface schemaDataType {
  imageUri: string;
  alias: string;
  version: string;
  attributes: attributeType[];
  active: 'archived' | 'active';
}

@Component({
  selector: 'app-schema-overview-page',
  templateUrl: './schema-overview-page.component.html',
  styleUrls: ['./schema-overview-page.component.css'],
})
export class SchemaOverviewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService,
    public router: Router
  ) {
    this.initTable();
  }
  displayedColNames: string[] = ['Name', 'Version', 'Status', 'Show details'];
  internalColNames: string[] = ['alias', 'version', 'active', 'button'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Version', 'Status'];
  internalColSelectNames: string[] = ['all', 'alias', 'version', 'active'];

  schemaData: schemaDataType[] = [];
  dataLoaded: boolean = false;

  button: any;
  ngOnInit(): void {}

  openShowSchemaDialog(
    idx: number,
    schemaData: schemaDataType[],
    dialogRef: MatDialog
  ) {
    if (idx < schemaData.length) {
      dialogRef.open(SchemaPopUpComponent, {
        data: {
          header: 'Details to schema "' + schemaData[idx].alias + '"',
          schema: schemaData[idx],
        },
      });
    } else {
      if (isDevMode()) {
        console.log(
          "index of requested schema isn't in the range of the provided schemas"
        );
      }
    }
  }

  initTable() {
    const params = new HttpParams();
    this.httpService
      .getRequest('Get all schemas', '/schema/all', params)
      .then((response) => {
        if (response.ok) {
          this.schemaData = response.body;
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
