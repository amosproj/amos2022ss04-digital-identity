import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from 'src/app/shared/pop-up/edit-window-pop-up/edit-window-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { FilteredTableComponent } from 'src/app/components/filtered-table/filtered-table.component';

@Component({
  selector: 'app-DIOverview-page',
  templateUrl: './DIOverview-page.component.html',
  styleUrls: ['./DIOverview-page.component.css'],
})
export class DIOverviewComponent implements OnInit {
  displayedColumnNames: string[] = ['Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status','Edit'];
  internalColumnNames: string[] = ['name', 'surname','email','openCredentials','openProofs','state','button']
  selectableCols: string[] = ['all', 'name', 'surname','email','openCredentials','openProofs','state'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Surname', 'Email', 'Open credentials','Open proofs','Connections status'];

  DIData :any[] = []
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
          console.log(this.DIData[0])
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
