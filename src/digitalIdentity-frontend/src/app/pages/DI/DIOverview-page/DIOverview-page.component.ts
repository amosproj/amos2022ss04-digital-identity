import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from 'src/app/shared/pop-up/edit-window-pop-up/edit-window-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { deleteProperties } from 'src/app/shared/filtered-table/filtered-table.component';
import { Router } from '@angular/router';
import { DataUpdateService } from 'src/app/services/data-update.service';
import { DiDetailPopUpComponent } from 'src/app/components/di-detail/di-detail-pop-up/di-detail-pop-up.component';

@Component({
  selector: 'app-DIOverview-page',
  templateUrl: './DIOverview-page.component.html',
  styleUrls: ['./DIOverview-page.component.css'],
})
export class DIOverviewComponent implements OnInit {
  displayedColNames : string[] = ['Alias', 'Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status','Edit', 'Details', 'Delete']; // prettier-ignore
  internalColNames : string[] = ['alias', 'name', 'surname','email','openCredentials','openProofs','state','button', 'button', 'button'] // prettier-ignore
  displayedColSelectNames: string[] = ['All', 'Alias', 'Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status']; // prettier-ignore
  internalColSelectNames : string[] = ['all', 'alias', 'name', 'surname','email','openCredentials','openProofs','state']; // prettier-ignore

  DIData: any[] = [];
  dataLoaded: boolean = false;

  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService,
    public router: Router,
    private dataUpdateService: DataUpdateService
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
    return [request, this.initTableWithOpenArtifacts()];
  }

  async initTableWithOpenArtifacts() {
    const params = new HttpParams();
    const request = await this.httpService
      .getRequest('Init DI-Overview', '/connection/all?with_open_artifacts=true', params)
      .then((response) => {
        if (response.ok) {
          this.DIData = response.body;
          this.dataUpdateService.updateData(response.body);
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

  openDiExpandedWindow(
    idx: number,
    diData: any[],
    dialogRef: MatDialog
  ) {
    if (isDevMode()) {
      console.log('Expand');
    }
    dialogRef.open(DiDetailPopUpComponent, {
      data: {
        di: diData[idx],
      },
    });
  }
  showDetailsOfDiConnection(id: number, connectionId: any) {
    console.log('showDetailsOfDiConnection erfolgreich ausgeführt');
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
