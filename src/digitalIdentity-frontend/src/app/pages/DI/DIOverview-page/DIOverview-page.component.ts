import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from 'src/app/shared/pop-up/edit-window-pop-up/edit-window-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

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
  constructor(
    private dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {
    this.initTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DIData.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'openCredentials',
    'openProofs',
    'connectionStatus',
    'edit',
  ];
  DIData = new MatTableDataSource();

  clicked(str: string): void {
    if (isDevMode()) {
      console.log('goto ' + str);
    }
  }

  initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest('Init DI-Overview', '/connection/all', params)
      .then((response) => {
        if (response.ok) {
          this.DIData = new MatTableDataSource(response.body);
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  ngOnInit(): void {}

  openEditWindowDialog(id: string) {
    this.dialogRef.open(EditWindowPopUpComponent, {
      data: {
        id: id,
      },
    });
  }

}
