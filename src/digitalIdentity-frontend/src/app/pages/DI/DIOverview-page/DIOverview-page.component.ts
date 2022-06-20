import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from 'src/app/shared/pop-up/edit-window-pop-up/edit-window-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { FilteredTableComponent } from 'src/app/components/filtered-table/filtered-table.component';

export interface DIPersData {
  id: number;
  name: string;
  surname: string;
  email: string;
  openCredentials: number;
  openProofs: number;
  connectionStatus: boolean;
  details: {};
}

@Component({
  selector: 'app-DIOverview-page',
  templateUrl: './DIOverview-page.component.html',
  styleUrls: ['./DIOverview-page.component.css'],
})
export class DIOverviewComponent implements OnInit {
  displayedColumnNames: string[] = ['Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status','Edit'];
  internalColumnNames: string[] = ['name', 'surname','email','openCredentials','openProofs','connectionStatus','button']
  selectableCols: string[] = ['all', 'name', 'surname','email','openCredentials','openProofs','connectionStatus'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status'];

  DIData = []
  filteredTable: FilteredTableComponent
  dataLoaded: boolean = false

  constructor(
    public dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {
    this.filteredTable = new FilteredTableComponent();
  }

  ngOnInit() {
    this.initTable();
  }



  async initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    const request = await this.HttpService.getRequest('Init DI-Overview', '/connection/all', params)
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


  openEditWindowDialog(rowIdx: number, data:any[], dialogRef:MatDialog) {
    dialogRef.open(EditWindowPopUpComponent, {
      data: {
        id: data[rowIdx].id,
      },
    });
  }

}
