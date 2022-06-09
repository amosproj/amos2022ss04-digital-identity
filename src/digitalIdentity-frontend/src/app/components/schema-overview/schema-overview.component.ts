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
  status: "archieved"|"active"
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
          console.log(dataStr);
          const filter_lowerCase = filter.trim().toLowerCase();
          return dataStr.indexOf(filter_lowerCase) != -1;
        }
      }
    }


  openShowSchemaDialog(idx: number) {
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
      <schemaDataType>{"name":"test", "iconUrl":"test","version":"2.0","attributes":[<attributeType>{"name":"testAttribute","type":"string"}],"status":"archieved"},
      <schemaDataType>{"name":"test2", "iconUrl":"tester","version":"1.0","attributes":[<attributeType>{"name":"testAttribute","type":"date"}],"status":"active"},
      <schemaDataType>{"name":"test3", "iconUrl":"testte","version":"2.0","attributes":[<attributeType>{"name":"testAttribute","type":"string"}],"status":"active"},
      <schemaDataType>{"name":"test4", "iconUrl":"test","version":"3.0","attributes":[<attributeType>{"name":"testAttribute","type":"number"}],"status":"archieved"}];
    this.schemaMatTableSource = new MatTableDataSource(this.schemaData);
  }

}

