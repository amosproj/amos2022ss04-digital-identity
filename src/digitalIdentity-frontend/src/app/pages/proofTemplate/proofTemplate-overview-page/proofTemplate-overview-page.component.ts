import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { FilteredTableComponent } from 'src/app/shared/filtered-table/filtered-table.component';
import { AddDIToProofTemplatePopUpComponent } from 'src/app/shared/pop-up/add-di-to-proof-template-pop-up/add-di-to-proof-template-pop-up.component';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';

@Component({
  selector: 'app-proof-overview-page',
  templateUrl: './proofTemplate-overview-page.component.html',
  styleUrls: ['./proofTemplate-overview-page.component.css'],
})
export class ProofTemplateOverviewPageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService
  ) {
    this.initTable();
  }
  displayedColumnNames: string[] = ['Name', 'Status', 'Show details', 'Send to DI']; //prettier-ignore
  internalColumnNames: string[] = ['name', 'active', 'button', 'button'];
  selectableCols: string[] = ['all', 'name', 'active'];
  displayedColSelectNames: string[] = ['All', 'Name', 'Status'];

  proofTemplateData: any[] = [];
  dataLoaded: boolean = false;

  ngOnInit(): void {}

  openShowProofDialog(
    idx: number,
    proofTemplateData: any,
    dialogRef: MatDialog
  ) {
    if (idx < proofTemplateData.length) {
      let text = 'Name: ' + proofTemplateData[idx].name + '\n';
      //TODO: add other attributes (also in tests)
      dialogRef.open(InformationPopUpComponent, {
        data: {
          header: 'Details to proof "' + proofTemplateData[idx].name + '"',
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

  openAddDIWindow(idx: number, proofTemplateData: any[], dialogRef: MatDialog) {
    if (isDevMode()) {
      console.log('open AddDI window');
      console.log('proofTemplateData:', proofTemplateData[idx]);
    }
    dialogRef.open(AddDIToProofTemplatePopUpComponent, {
      data: {
        id: proofTemplateData[idx].templateId,
        alias: proofTemplateData[idx].name,
      },
    });
  }

  initTable() {
    const params = new HttpParams().append('authorization', 'passing');
    this.httpService
      .getRequest('Get all proofs', '/proof-template/all', params)
      .then((response) => {
        if (response.ok) {
          this.proofTemplateData = response.body;
          this.dataLoaded = true;
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }
}
