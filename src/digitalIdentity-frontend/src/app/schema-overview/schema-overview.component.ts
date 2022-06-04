import { InteractivityChecker } from '@angular/cdk/a11y';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ShowSchemaPopUpComponent } from '../show-schema-pop-up/show-schema-pop-up.component';

export interface attributeType {
  name: string,
  type: "string"|"date"|"number"
}
export interface schemaDataType {
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
  selectableCols: string[] = [
    'all',
    'name',
    'version',
    'status'
  ];
  selectedCol:FormGroup = new FormGroup({col : new FormControl("all")}) //new FormControl("all");
  schemaData:schemaDataType[] = [];
  schemaMatTableSource: MatTableDataSource<schemaDataType> = new MatTableDataSource();
  ngOnInit(): void {
    this.initTable();
  }

  applyFilter(event: Event, column: string) {
    this.schemaMatTableSource.filterPredicate = this.getFilterPredicate(column);
    const filterValue = (event.target as HTMLInputElement).value;
    this.schemaMatTableSource.filter = filterValue.trim().toLowerCase();
  }

    getFilterPredicate(column: string) {
      if (column == 'all'){
        return (data: any,filter:string) => {
          const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
            return currentTerm + (data as {[key: string]: any})[key] + '◬';
          }, '').toLowerCase();
          const filter_lowerCase = filter.trim().toLowerCase();

          return dataStr.indexOf(filter_lowerCase) != -1;
        }
      }
      else {
        return (data:any, filter:string) => {
          const dataStr = (data as {[key:string]:any})[column];
          const filter_lowerCase = filter.trim().toLowerCase();
          return dataStr.indexOf(filter_lowerCase) != -1;
        }
      }
    }


  openShowSchemaDialog(idx: number) {
    console.log("requested index " + idx)
    if (idx < this.schemaData.length) {
      this.dialogRef.open(ShowSchemaPopUpComponent, {
        data: {
          schemaDetails: this.schemaData[idx]
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
    // var httpAnswer = this.getAllSchemaDetails().subscribe({
    //   next: (response: HttpResponse<any>) => {
    //     if (response.ok) {
    //       if (isDevMode()) {
    //         console.log('Got server response:');
    //         console.log(response);
    //       }
    //       this.schemaData = response.body;
    //       this.schemaMatTableSource = new MatTableDataSource(response.body);
    //     } else {
    //       if (isDevMode()) {
    //         console.log('Error:');
    //         console.log(response);
    //       }
    //     }
    //   },
    //   error: (error) => {
    //     if (isDevMode()) {
    //       console.log('Error in HTTP request:');
    //       console.log(error);
    //     }
    //   },
    // });
    this.schemaData = <schemaDataType[]>[
      <schemaDataType>{"name":"test", "iconUrl":"test","version":"2.0","attributes":[<attributeType>{"name":"testAttribute","type":"string"}],"status":false},
      <schemaDataType>{"name":"test2", "iconUrl":"tester","version":"1.0","attributes":[<attributeType>{"name":"testAttribute","type":"date"}],"status":true},
      <schemaDataType>{"name":"test3", "iconUrl":"testte","version":"2.0","attributes":[<attributeType>{"name":"testAttribute","type":"string"}],"status":false},
      <schemaDataType>{"name":"test4", "iconUrl":"test","version":"3.0","attributes":[<attributeType>{"name":"testAttribute","type":"number"}],"status":true}];
    this.schemaMatTableSource = new MatTableDataSource(this.schemaData);
      console.log("schemaData init")
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
