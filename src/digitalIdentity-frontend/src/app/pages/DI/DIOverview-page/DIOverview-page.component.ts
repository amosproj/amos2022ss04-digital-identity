import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from 'src/app/shared/pop-up/edit-window-pop-up/edit-window-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import {
  deleteProperties,
  FilteredTableComponent,
} from 'src/app/shared/filtered-table/filtered-table.component';

@Component({
  selector: 'app-DIOverview-page',
  templateUrl: './DIOverview-page.component.html',
  styleUrls: ['./DIOverview-page.component.css'],
})
export class DIOverviewComponent implements OnInit {
  displayedColNames : string[] = ['Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status','Edit', 'Delete']; // prettier-ignore
  internalColNames : string[] = ['name', 'surname','email','openCredentials','openProofs','state','button', 'button'] // prettier-ignore
  displayedColSelectNames: string[] = ['All', 'Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status']; // prettier-ignore
  internalColSelectNames : string[] = ['all', 'name', 'surname','email','openCredentials','openProofs','state']; // prettier-ignore

  DIData: any[] = [];
  filteredTable: FilteredTableComponent;
  dataLoaded: boolean = false;

  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService
  ) {
    this.filteredTable = new FilteredTableComponent();
  }

  ngOnInit() {
    this.initTable();
  }

  async initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    const request = await this.httpService
      .getRequest('Init DI-Overview', '/connection/all', params)
      .then((response) => {
        if (response.ok) {
          this.DIData = response.body;
          this.dataLoaded = true;
        }
      })
      .catch((response) => {
        if (isDevMode()) {
          console.log('error');
          console.log(response);
        }
      });
    return request;
  }

  openEditWindowDialog(rowIdx: number, data: any[], dialogRef: MatDialog) {
    dialogRef.open(EditWindowPopUpComponent, {
      data: {
        id: data[rowIdx].id,
      },
    });
  }

  deleteDiConnection(id: number, connectionId: any) {
    var params = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('connectionId', connectionId);

    const request = this.httpService
      .postRequest('Delete DI-Connection', '/connection/remove', '', params)
      .then((response) => {
        // TODO: fix backend or backendservice
        // If the backend generates an answer which body contains a string and not a json, response is going to be a HttpErrorResponse
        // e.g.
        //         error: SyntaxError: Unexpected token S in JSON at position 0 at JSON.parse (<anonymous>) at XMLHttpRequest.onLoad (http://localhost:4200/vendor.js:40310:39) at _ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:3521:31) at Object.onInvokeTask (http://localhost:4200/vendor.js:66904:33) at _ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:3520:60) at Zone.runTask (http://localhost:4200/polyfills.js:3293:47) at ZoneTask.invokeTask [as invoke] (http://localhost:4200/polyfills.js:3602:34) at invokeTask (http://localhost:4200/polyfills.js:4763:18) at globalCallback (http://localhost:4200/polyfills.js:4806:33) at XMLHttpRequest.globalZoneAwareCallback (http://localhost:4200/polyfills.js:4827:16)
        // message: "Unexpected token S in JSON at position 0"
        // stack: "SyntaxError: Unexpected token S in JSON at position 0\n    at JSON.parse (<anonymous>)\n

        if (response.ok) {
          // console.log('status:', response.status);
          // if (response.status == 200) {
          alert('Delete id:' + id + ' connectionID:' + connectionId + ' done!');
          window.location.reload();
        }
      })
      .catch((response) => {
        if (isDevMode()) {
          console.log('error');
          console.log(response);
        }
      });
  }

  buildDeleteProperties(row: any): deleteProperties {
    console.log(row);
    if (row != undefined && row.email != undefined && row.email != '') {
      return {
        header: 'Delete Connection',
        text:
          'Are you sure to delete the connection with email <strong>' +
          row.email +
          '</strong>?',
      };
    } else if (row != undefined && row.alias != undefined && row.alias != '') {
      return {
        header: 'Delete Connection',
        text:
          'Are you sure to delete the connection with alias <strong>' +
          row.alias +
          '</strong>?',
      };
    }
    return {
      header: 'Delete Connection',
      text: 'Are you sure to delete this connection?',
    };
  }
}
