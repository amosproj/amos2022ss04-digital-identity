import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { FilteredTableComponent } from 'src/app/shared/filtered-table/filtered-table.component';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';

@Component({
  selector: 'app-proof-overview-page',
  templateUrl: './proof-overview-page.component.html',
  styleUrls: ['./proof-overview-page.component.css']
})
export class ProofOverviewPageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {
    this.initTable();
    this.filteredTable = new FilteredTableComponent();
  }
  displayedColumnNames: string[] = ['Name',  'Status', 'Show details'];
  internalColumnNames: string[] = ['alias', 'active','button']
  selectableCols: string[] = ['all', 'alias',  'active'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Status'];

  proofData: any[] = [];
  filteredTable:FilteredTableComponent
  dataLoaded: boolean = false

  ngOnInit(): void {
  }

  openShowProofDialog(idx: number,proofData:any[],dialogRef:MatDialog) {
    if (idx < proofData.length) {
      let text =
        'Name: ' +
        proofData[idx].alias +
        '\n' +
        'Version: ' +
        proofData[idx].version +
        '\n' +
        'Other attributes: ';
      for (let attr of proofData[idx].attributes) {
        text = text + '\n' + attr;
      }
      dialogRef.open(InformationPopUpComponent, {
        data: {
          header: 'Details to proof "' + proofData[idx].alias + '"',
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
    this.HttpService.getRequest("Get all proofs","/proof/all",params)
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
