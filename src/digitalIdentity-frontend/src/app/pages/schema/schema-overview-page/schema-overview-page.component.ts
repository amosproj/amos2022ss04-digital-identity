import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';
import { FilteredTableComponent } from 'src/app/components/filtered-table/filtered-table.component';
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
    private HttpService: BackendHttpService
  ) {
    this.initTable();
    this.filteredTable = new FilteredTableComponent();
  }
  displayedColumns: string[] = ['name', 'version', 'status', 'show details'];
  selectableCols: string[] = ['all', 'name', 'version', 'status'];

  schemaData: schemaDataType[] = [];
  filteredTable:FilteredTableComponent

  ngOnInit(): void {
  }

  openShowSchemaDialog(idx: number,schemaData:any[]) {
    if (idx < schemaData.length) {
      let text =
        'Name: ' +
        this.schemaData[idx].alias +
        '\n' +
        'imageUri: ' +
        this.schemaData[idx].imageUri +
        '\n' +
        'Version: ' +
        schemaData[idx].version +
        '\n' +
        'Other attributes: ';
      for (let attr of schemaData[idx].attributes) {
        text = text + '\n' + attr.name + ': ' + attr.type;
      }

      this.dialogRef.open(InformationPopUpComponent, {
        data: {
          header: 'Details to schema "' + schemaData[idx].name + '"',
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
    this.HttpService.getRequest("Get all schemas","/schema/all",params)
    .then(
      response => {
        if (response.ok) {
          this.schemaData = response.body
          // this.schemaMatTableSource = new MatTableDataSource(response.body)
          console.log(response);
        }
      }
    )
    .catch(response => {console.log("error"); console.log(response)})

  }
}
