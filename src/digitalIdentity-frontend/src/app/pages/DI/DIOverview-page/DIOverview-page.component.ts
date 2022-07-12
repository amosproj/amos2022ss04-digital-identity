import { Component, OnInit } from '@angular/core';
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
  displayedColNames : string[] = ['Alias', 'Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status','Edit', 'Delete']; // prettier-ignore
  internalColNames : string[] = ['alias', 'name', 'surname','email','openCredentials','openProofs','state','button', 'button'] // prettier-ignore
  displayedColSelectNames: string[] = ['All', 'Alias', 'Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status']; // prettier-ignore
  internalColSelectNames : string[] = ['all', 'alias', 'name', 'surname','email','openCredentials','openProofs','state']; // prettier-ignore

  DIData: any[] = [];
  dataLoaded: boolean = false;

  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService
  ) {}

  ngOnInit() {
    this.initTable();
  }

  async initTable() {
    const params = new HttpParams();
    const request = await this.httpService
      .getRequest('Init DI-Overview', '/connection/all', params)
      .then((response) => {
        if (response.ok) {
          this.DIData = response.body;
          this.dataLoaded = true;
        }
      })
      .catch(() => {});
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
    params = params.append('connectionId', connectionId);

    const request = this.httpService
      .postRequest('Delete DI-Connection', '/connection/remove', '', params)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {});
  }

  buildDeleteProperties(row: any): deleteProperties {
    console.log(row);
    if (row != undefined && row.email != undefined && row.email != '') {
      return {
        header: 'Delete digital identity',
        text:
          'Are you sure to delete the DI with email <strong>' +
          row.email +
          '</strong>?',
      };
    } else if (row != undefined && row.alias != undefined && row.alias != '') {
      return {
        header: 'Delete digital identity',
        text:
          'Are you sure to delete the DI with alias <strong>' +
          row.alias +
          '</strong>?',
      };
    }
    return {
      header: 'Delete digital identity',
      text: 'Are you sure to delete this DI?',
    };
  }
}
