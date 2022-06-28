import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';
import { FilteredTableComponent } from 'src/app/shared/filtered-table/filtered-table.component';
export interface attributeType {
  name: string;
  type: 'string' | 'date' | 'number';
}
export interface schemaDataType {
  imageUri: string;
  alias: string;
  version: string;
  attributes: attributeType[];
  active: 'archived' | 'active';
}

@Component({
  selector: 'app-schema-overview-page',
  templateUrl: './schema-overview-page.component.html',
  styleUrls: ['./schema-overview-page.component.css']
})
export class SchemaOverviewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService
  ) {
    this.initTable();
    this.filteredTable = new FilteredTableComponent();
  }
  displayedColumnNames: string[] = ['Name', 'Version', 'Status', 'Show details'];
  internalColumnNames: string[] = ['alias', 'version','active','button']
  selectableCols: string[] = ['all', 'alias', 'version', 'active'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Version', 'Status'];

  schemaData: schemaDataType[] = [];
  filteredTable:FilteredTableComponent
  dataLoaded: boolean = false

  ngOnInit(): void {
  }

  openShowSchemaDialog(idx: number,schemaData:any[],dialogRef:MatDialog) {
    if (idx < schemaData.length) {
      let text =
        'Name: ' +
        schemaData[idx].alias +
        '\n' +
        'imageUri: ' +
        schemaData[idx].imageUri +
        '\n' +
        'Version: ' +
        schemaData[idx].version +
        '\n' +
        'Other attributes: ';
      for (let attr of schemaData[idx].attributes) {
        text = text + '\n' + attr;
      }
      dialogRef.open(InformationPopUpComponent, {
        data: {
          header: 'Details to schema "' + schemaData[idx].alias + '"',
          text: text,
        },
      });
    } else {
      if (isDevMode()) {
        console.log(
          "index of requested schema isn't in the range of the provided schemas"
        );
      }
    }
  }

  initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    this.httpService.getRequest("Get all schemas","/schema/all",params)
    .then(
      response => {
        if (response.ok) {
          this.schemaData = response.body
          this.dataLoaded = true;
        }
      }
    )
    .catch(response => {console.log("error"); console.log(response)})

  }
}
