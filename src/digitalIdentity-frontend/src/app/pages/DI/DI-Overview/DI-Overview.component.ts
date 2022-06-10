import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from '../../../shared/edit-window-pop-up/edit-window-pop-up.component';
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
  selector: 'app-DI-Overview',
  templateUrl: './DI-Overview.component.html',
  styleUrls: ['./DI-Overview.component.css'],
})

export class DIOverviewComponent implements OnInit {
  constructor(
     private dialogRef: MatDialog,
     private HttpService: BackendHttpService) {
    this.initTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DIData.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = [
    'id',
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

  // const header = new HttpHeaders().append('Content-Type', 'application/json');
  // const param = new HttpParams().append('authorization', 'passing');
  // return this.http.get<HttpResponse<any>>(
  //   environment.serverURL + '/connection/all',
  //   { headers: header, observe: 'response', params: param }
  // );

  initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest("Init DI-Overview","/connection/all", params)
    .then(
      response => {
        if (response.ok) {
          this.DIData = new MatTableDataSource(response.body);
        }
      }
    )
    .catch(response => {console.log("error"); console.log(response)})
  }

  ngOnInit(): void {}

  openEditWindowDialog(id: string) {
    this.dialogRef.open(EditWindowPopUpComponent, {
      data: {
        id: id,
      },
    });
  }

  // initPersonalInformation(DIs: DIPersData[]) {

  //   var dummy = [
  //     {
  //       key: 'id',
  //       label: 'ID',
  //       required: true,
  //       value: (DI: DIPersData) => `${DI.id}`,
  //     },
  //     {
  //       key: 'name',
  //       header: 'Name',
  //       required: true,
  //       value: (DI: DIPersData) => `${DI.name}`,
  //     },
  //     {
  //       key: 'surname',
  //       label: 'Surname',
  //       required: true,
  //       value: (DI: DIPersData) => `${DI.surname}`,
  //     },
  //     {
  //       key: 'email',
  //       label: 'Email',
  //       required: true,
  //       value: (DI: DIPersData) => `${DI.email}`,
  //     },
  //     {
  //       key: 'openCredentials',
  //       label: 'Open credentials',
  //       required: true,
  //       value: (DI: DIPersData) => `${DI.openCredentials}`,
  //     },
  //     {
  //       key: 'openProofs',
  //       label: 'Open proofs',
  //       required: true,
  //       value: (DI: DIPersData) => `${DI.openProofs}`,
  //     },
  //     {
  //       key: 'connectionStatus',
  //       label: 'connectionStatus',
  //       required: true,
  //       value: (DI: DIPersData) => `${DI.connectionStatus}`,
  //     },
  //     {
  //       key: 'edit',
  //       label: ''
  //     }
  //   ];

  //   return dummy;
  // }
}
