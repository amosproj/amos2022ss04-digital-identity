import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilteredTableComponent } from 'src/app/shared/filtered-table/filtered-table.component';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { TablePopUpComponent } from 'src/app/components/credDefDetail-table-pop-up/credDefDetail-table-pop-up.component';

@Component({
  selector: 'app-credential-overview-page',
  templateUrl: './credDef-overview-page.component.html',
  styleUrls: ['./credDef-overview-page.component.css']
})
export class CredDefOverviewPageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService
  ) {
    this.initTable();
    this.filteredTable = new FilteredTableComponent();
  }
  displayedColumnNames: string[] = ['Name', 'Status', 'Expand','Add DI'];
  internalColumnNames: string[] = ['alias','active','button','button']
  selectableCols: string[] = ['all', 'alias', 'active'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Status'];

  credDefData: any[] = [];
  filteredTable:FilteredTableComponent
  dataLoaded: boolean = false

  ngOnInit(): void {
  }

  openCredDefExpandedWindow(idx: number,credDefData:any[],dialogRef:MatDialog) {
    if (isDevMode()) {
      console.log("Expand")
    }
    dialogRef.open(TablePopUpComponent, {
      data: {
        credDef: credDefData[idx],
      },
    });

  }

  openAddDIWindow(idx: number,credDefData:any[],dialogRef:MatDialog) {
    if (isDevMode()) {
      console.log("open AddDI window")
    }
  }

  initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    this.httpService.getRequest("Get all credential definitions","/credential-definition/all",params)
    .then(
      response => {
        if (response.ok) {
          this.credDefData = response.body
          this.dataLoaded = true;
        }
      }
    )
    .catch(response => {console.log("error"); console.log(response)})
  }
}
