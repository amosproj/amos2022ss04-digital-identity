import { Component, isDevMode, OnInit } from '@angular/core';
import { EditWindowPopUpComponent } from '../edit-window-pop-up/edit-window-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface DIPersData {
  id:number,
  name:string,
  surname:string,
  email:string,
  openCredentials:number,
  openProofs:number,
  connectionStatus:boolean,
  details:{}
}

@Component({
  selector: 'app-DI-Overview',
  templateUrl: './DI-Overview.component.html',
  styleUrls: ['./DI-Overview.component.css']
})


export class DIOverviewComponent implements OnInit {

  constructor(private http : HttpClient, private dialogRef : MatDialog) {

    this.initTable();
  }

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'openCredentials', 'openProofs', 'connectionStatus', 'edit'];
  DIData = [];


  clicked(str:string) : void {
    if(isDevMode()) {
      console.log("goto " + str)
    }
  }


  initTable() {
    var httpAnswer = this.getAllDIDetails()
    .subscribe({
      next: (response : HttpResponse<any>) => {
        if (response.ok) {
          if (isDevMode()) {
            console.log("Got server response:")
            console.log(response)
          }
          this.DIData = response.body
        }
        else {
          if (isDevMode()) {
            console.log("Error:")
            console.log(response)
          }
        }
      },
      error: (error) => {
        if (isDevMode()) {
          console.log("Error in HTTP request:")
          console.log(error)
        }
      }
    });

  }


  ngOnInit(): void {

  }


  openEditWindowDialog(id:string) {
    this.dialogRef.open(EditWindowPopUpComponent, {
      data: {
        id:id
      }
    })
  }


  getAllDIDetails() {
    const header = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    const param = new HttpParams()
      .append('authorization', 'passing')
    ;
    return this.http.get<HttpResponse<any>>(environment.serverURL+'/connection/all',{headers: header, observe: "response", params: param})
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
