import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ShowSchemaPopUpComponent } from '../show-schema-pop-up/show-schema-pop-up.component';

export interface attributeType {
  name: string,
  type: string|Date|number
}
export interface schemaData {
  iconUrl: string,
  name: string,
  version: string,
  attributes: attributeType[]
  status: boolean
}

@Component({
  selector: 'app-schema-overview',
  templateUrl: './schema-overview.component.html',
  styleUrls: ['./schema-overview.component.css'],
})
export class SchemaOverviewComponent implements OnInit {
  constructor(private http: HttpClient, private dialogRef: MatDialog) {}
  displayedColumns: string[] = [
      'name',
      'version',
      'status',
      'show details'
  ];
  SchemaData = []
  ngOnInit(): void {}

  openShowSchemaDialog(idx: number) {
    if (idx < this.SchemaData.length) {
      this.dialogRef.open(ShowSchemaPopUpComponent, {
        data: {
          schemaDetails: this.SchemaData[idx]
        },
      });
    }
    else {
      if (isDevMode()) {
        console.log("index of requested schema isn't in the range of the provided schemas")
      }
    }
  }

  getAllSchemaDetails() {
    const header = new HttpHeaders().append('Content-Type', 'application/json');
    const param = new HttpParams().append('authorization', 'passing');
    return this.http.get<HttpResponse<any>>(
      environment.serverURL + '/schema/all',
      { headers: header, observe: 'response', params: param }
    );
  }

  initTable() {
    var httpAnswer = this.getAllSchemaDetails().subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          if (isDevMode()) {
            console.log('Got server response:');
            console.log(response);
          }
          this.SchemaData = response.body;
        } else {
          if (isDevMode()) {
            console.log('Error:');
            console.log(response);
          }
        }
      },
      error: (error) => {
        if (isDevMode()) {
          console.log('Error in HTTP request:');
          console.log(error);
        }
      },
    });
  }
}

// export interface DIPersData {
//   id: number;
//   name: string;
//   surname: string;
//   email: string;
//   openCredentials: number;
//   openProofs: number;
//   connectionStatus: boolean;
//   details: {};
// }

// @Component({
//   selector: 'app-DI-Overview',
//   templateUrl: './DI-Overview.component.html',
//   styleUrls: ['./DI-Overview.component.css'],
// })
// export class DIOverviewComponent implements OnInit {
//   constructor(private http: HttpClient, private dialogRef: MatDialog) {
//     this.initTable();
//   }

//   displayedColumns: string[] = [
//     'id',
//     'name',
//     'surname',
//     'email',
//     'openCredentials',
//     'openProofs',
//     'connectionStatus',
//     'edit',
//   ];
//   DIData = [];

//   clicked(str: string): void {
//     if (isDevMode()) {
//       console.log('goto ' + str);
//     }
//   }

//   initTable() {
//     var httpAnswer = this.getAllDIDetails().subscribe({
//       next: (response: HttpResponse<any>) => {
//         if (response.ok) {
//           if (isDevMode()) {
//             console.log('Got server response:');
//             console.log(response);
//           }
//           this.DIData = response.body;
//         } else {
//           if (isDevMode()) {
//             console.log('Error:');
//             console.log(response);
//           }
//         }
//       },
//       error: (error) => {
//         if (isDevMode()) {
//           console.log('Error in HTTP request:');
//           console.log(error);
//         }
//       },
//     });
//   }

//   ngOnInit(): void {}

//   openEditWindowDialog(id: string) {
//     this.dialogRef.open(EditWindowPopUpComponent, {
//       data: {
//         id: id,
//       },
//     });
//   }

//   getAllDIDetails() {
//     const header = new HttpHeaders().append('Content-Type', 'application/json');
//     const param = new HttpParams().append('authorization', 'passing');
//     return this.http.get<HttpResponse<any>>(
//       environment.serverURL + '/connection/all',
//       { headers: header, observe: 'response', params: param }
//     );
//   }
