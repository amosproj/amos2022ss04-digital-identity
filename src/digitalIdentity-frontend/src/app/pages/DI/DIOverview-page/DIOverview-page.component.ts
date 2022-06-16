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
  displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'openCredentials',
    'openProofs',
    'connectionStatus',
    'edit',
  ];
  DIData = []
  filteredTable: FilteredTableComponent

  constructor(
    public dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {
    this.filteredTable = new FilteredTableComponent();
  }

  ngOnInit() {
    this.initTable();
    // console.log(this.DIData)
  }



  async initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    const request = await this.HttpService.getRequest('Init DI-Overview', '/connection/all', params)
      .then((response) => {
        if (response.ok) {
          this.DIData = response.body;
        }
      })
      .catch((response) => {
        if (isDevMode()) {
          console.log('error');
          console.log(response);
        }
      });
      this.filteredTable.updateTable(this.DIData, this.displayedColumns);
      return request;
  }


  openEditWindowDialog(id: number, data:any[]) {
    this.dialogRef.open(EditWindowPopUpComponent, {
      data: {
        id: id,
      },
    });
  }

}
