import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { FilteredTableComponent } from 'src/app/shared/filtered-table/filtered-table.component';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';

@Component({
  selector: 'app-proof-overview-page',
  templateUrl: './proofTemplate-overview-page.component.html',
  styleUrls: ['./proofTemplate-overview-page.component.css']
})
export class ProofTemplateOverviewPageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService
  ) {
    this.initTable();
    this.filteredTable = new FilteredTableComponent();
  }
  displayedColumnNames: string[] = ['Name',  'Status', 'Show details'];
  internalColumnNames: string[] = ['name', 'active','button']
  selectableCols: string[] = ['all', 'name',  'active'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Status'];

  proofData: any[] = [];
  filteredTable:FilteredTableComponent
  dataLoaded: boolean = false

  ngOnInit(): void {
  }

  openShowProofDialog(idx: number,proofData:any,dialogRef:MatDialog) {
    if (idx < proofData.length) {
      let text =
        'Name: ' +
        proofData[idx].name +
        '\n';
      //TODO: add other attributes (also in tests)
      dialogRef.open(InformationPopUpComponent, {
        data: {
          header: 'Details to proof "' + proofData[idx].name + '"',
          text: text,
        },
      });
    } else {
      if (isDevMode()) {
        console.log(
          "index of requested proof isn't in the range of the provided proofs"
        );
      }
    }
  }

  initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    this.httpService.getRequest("Get all proofs","/proof-template/all", params)
    .then(
      response => {
        if (response.ok) {
          this.proofData = response.body
          this.dataLoaded = true;
        }
      }
    )
    .catch(response => {console.log("error"); console.log(response)})

  }

}
