import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';
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
  styleUrls: ['./schema-overview-page.component.css'],
})
export class SchemaOverviewComponent implements OnInit {
  constructor(
    private dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {}
  displayedColumns: string[] = ['alias', 'version', 'active', 'show details'];
  selectableCols: string[] = ['all', 'alias', 'version', 'active'];
  selectedCol: FormGroup = new FormGroup({ col: new FormControl('all') }); //new FormControl("all");
  schemaData: schemaDataType[] = [];
  schemaMatTableSource: MatTableDataSource<schemaDataType> =
    new MatTableDataSource();
  ngOnInit(): void {
    this.initTable();
  }

  applyFilter(event: Event, column: string) {
    this.schemaMatTableSource.filterPredicate = this.getFilterPredicate(column);
    const filterValue = (event.target as HTMLInputElement).value;
    this.schemaMatTableSource.filter = filterValue.trim().toLowerCase();
  }

  getFilterPredicate(column: string) {
    if (column == 'all') {
      return (data: any, filter: string) => {
        const dataStr = Object.keys(data)
          .reduce((currentTerm: string, key: string) => {
            return currentTerm + (data as { [key: string]: any })[key] + '◬';
          }, '')
          .toLowerCase();
        const filter_lowerCase = filter.trim().toLowerCase();

        return dataStr.indexOf(filter_lowerCase) != -1;
      };
    } else {
      return (data: any, filter: string) => {
        const dataStr = (data as { [key: string]: any })[column];
        console.log(dataStr);
        const filter_lowerCase = filter.trim().toLowerCase();
        return dataStr.indexOf(filter_lowerCase) != -1;
      };
    }
  }

  openShowSchemaDialog(idx: number) {
    if (idx < this.schemaData.length) {
      let text =
        'Name: ' +
        this.schemaData[idx].alias +
        '\n' +
        'imageUri: ' +
        this.schemaData[idx].imageUri +
        '\n' +
        'Version: ' +
        this.schemaData[idx].version +
        '\n' +
        'Other attributes: ';
      for (let attr of this.schemaData[idx].attributes) {
        text = text + '\n' + attr.name + ': ' + attr.type;
      }

      this.dialogRef.open(InformationPopUpComponent, {
        data: {
          header: 'Details to schema "' + this.schemaData[idx].alias + '"',
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
          this.schemaMatTableSource = new MatTableDataSource(response.body)
          console.log(response);
        }
      }
    )
    .catch(response => {console.log("error"); console.log(response)})

  }
}
