import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { AddDIToProofTemplatePopUpComponent } from 'src/app/shared/pop-up/add-di-to-proof-template-pop-up/add-di-to-proof-template-pop-up.component';
import { ProofDetailPopUpComponent } from '../../../components/proof-detail/proof-detail-pop-up/proof-detail-pop-up.component';

@Component({
  selector: 'app-proof-overview-page',
  templateUrl: './proofTemplate-overview-page.component.html',
  styleUrls: ['./proofTemplate-overview-page.component.css'],
})
export class ProofTemplateOverviewPageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    public httpService: BackendHttpService,
    public router: Router
  ) {
    this.initTable();
  }
  displayedColumnNames: string[] = ['Name', 'Status', 'Send to DI', 'Expand', ]; //prettier-ignore
  internalColumnNames: string[] = ['name', 'active', 'button', 'button']; //prettier-ignore
  selectableCols: string[] = ['all', 'name', 'active']; //prettier-ignore
  displayedColSelectNames: string[] = ['All', 'Name', 'Status']; //prettier-ignore

  proofTemplateData: any[] = [];
  dataLoaded: boolean = false;

  ngOnInit(): void {}

  openShowProofDialog(
    idx: number,
    proofTemplateData: any,
    dialogRef: MatDialog
  ) {
    if (idx < proofTemplateData.length) {
      dialogRef.open(ProofDetailPopUpComponent, {
        data: {
          proofTemplate: proofTemplateData[idx],
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
    const params = new HttpParams();
    this.httpService
      .getRequest('Get all proofs', '/proof-template/all', params)
      .then((response) => {
        if (response.ok) {
          this.proofTemplateData = response.body;
          this.dataLoaded = true;
        }
      })
      .catch(() => {});
  }

  handleMouseEvent(event: any, routerLink: string) {
    if (event) {
      event.preventDefault();
      switch (event.button) {
        //left mouse button
        case 0:
          if (event.ctrlKey) {
            this.openNewTab(routerLink);
          } else if (event.shiftKey) {
            this.openNewWindow(routerLink);
          } else {
            this.router.navigateByUrl(routerLink);
          }
          break;
        //middle mouse button
        case 1:
          this.openNewTab(routerLink);
          break;
        //right mouse button
        case 2:
          break;
      }
    }
  }

  openNewTab(route: any) {
    window.open(route, '_blank');
  }

  openNewWindow(route: any) {
    window.open(
      route,
      '_blank',
      'location=yes,height=1920,width=1024,scrollbars=yes,status=yes'
    );
  }
}
