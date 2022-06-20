import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilteredTableComponent } from 'src/app/components/filtered-table/filtered-table.component';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-credential-overview-page',
  templateUrl: './credDef-overview-page.component.html',
  styleUrls: ['./credDef-overview-page.component.css']
})
export class CredDefOverviewPageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {
    this.initTable();
    this.filteredTable = new FilteredTableComponent();
  }
  displayedColumnNames: string[] = ['Name', 'Status', 'Edit','Add DI'];
  internalColumnNames: string[] = ['alias','active','button','button']
  selectableCols: string[] = ['all', 'alias', 'active'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Status'];

  credDefData: any[] = [];
  filteredTable:FilteredTableComponent
  dataLoaded: boolean = false

  ngOnInit(): void {
  }

  openCredDefEditWindow(idx: number,credDefData:any[],dialogRef:MatDialog) {
    if (isDevMode()) {
      console.log("Edit")
    }
  }

  openAddDIWindow(idx: number,credDefData:any[],dialogRef:MatDialog) {
    if (isDevMode()) {
      console.log("AddDI")
    }
  }

  initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest("Get all credential definitions","/credential-definition/all",params)
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
