import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { InformationPopUpComponent } from '../information-pop-up/information-pop-up.component';

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
  constructor(private dialogRef: MatDialog, private HttpService: BackendHttpService) {}
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
      let text =  "Name: " + this.schemaData[idx].name +"\n"+
                  "IconUrl: " + this.schemaData[idx].iconUrl +"\n"+
                  "Version: " + this.schemaData[idx].version + "\n" +
                  "Other attributes: "
      for (let attr of this.schemaData[idx].attributes) {
        text = text +"\n" + attr.name + ": " + attr.type
      }

      this.dialogRef.open(InformationPopUpComponent, {
        data: {
          header: "Details to schema \"" + this.schemaData[idx].name +"\"",
          text: text
        },
      });
    }
    else {
      if (isDevMode()) {
        console.log("index of requested schema isn't in the range of the provided schemas")
      }
    }
  }

  initTable() {
    // const params = new HttpParams().append('authorization', 'passing');
    // this.HttpService.getRequest("Get all schemas","/schema/all",params)
    // .then(
    //   answer => {
    //     if (answer.ok) {
    //       this.schemaData = answer.body
    //       this.schemaMatTableSource = new MatTableDataSource(answer.body)
    //     }
    //   }
    // )
    // .catch(answer => {console.log("error"); console.log(answer)})

    this.schemaData = <schemaDataType[]>[
      <schemaDataType>{"name":"test", "iconUrl":"test","version":"2.0","attributes":[<attributeType>{"name":"testAttribute","type":"string"}],"status":"archieved"},
      <schemaDataType>{"name":"test2", "iconUrl":"tester","version":"1.0","attributes":[<attributeType>{"name":"testAttribute","type":"date"}],"status":"active"},
      <schemaDataType>{"name":"test3", "iconUrl":"testte","version":"2.0","attributes":[<attributeType>{"name":"testAttribute","type":"string"}],"status":"active"},
      <schemaDataType>{"name":"test4", "iconUrl":"test","version":"3.0","attributes":[<attributeType>{"name":"testAttribute","type":"number"}],"status":"archieved"}];
    this.schemaMatTableSource = new MatTableDataSource(this.schemaData);
  }

}

