import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { TimestampConverter } from 'src/app/services/timestamp-converter/timestamp-converter.service';
import {HttpParams} from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';

export interface attribute {
  name: string;
  value: string;
}
export interface proofTemplate {
  revealedAttributes: Map <string, attribute[]>;
  selfAttestedAttributes: attribute[];
  exchangeId: string;
  templateId: string;
  connectionAlias: string;
  referenceName: string;
  state: string;
  updatedAt: string;
}

@Component({
  selector: 'app-proof-detail-pop-up',
  templateUrl: './proof-detail-pop-up.component.html',
  styleUrls: ['./proof-detail-pop-up.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProofDetailPopUpComponent{

  proofTemplate: any;
  proofTemplateData: proofTemplate[] = [];
  proofTemplateDataFull: proofTemplate[] = [];
  displayedAttributeColumns = ['name', 'value'];
  displayedSelfAttestedAttributeColumns = ['name', 'value'];
  proofTemplatesLoading: boolean = false;

  // MatPaginator Inputs
  pageIndex = 0;
  length = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(
    public dialogRef: MatDialog,
    public timestampConverter: TimestampConverter,
    public httpService: BackendHttpService,
    @Inject(MAT_DIALOG_DATA)
    public params: {
      proofTemplate: any;
      openAddDIWindow: (proofTemplate: any, dialogRef: MatDialog) => void;
    }
  ) {
    this.proofTemplate = params.proofTemplate;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = this.length;

    this.requestProofTemplate();
  }

  // ========
  // Request Events
  // ========

  requestProofTemplate() {
    this.proofTemplatesLoading = true;

    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('proofTemplateId', this.proofTemplate.templateId)
      .append('page', this.pageIndex)
      .append('size', this.pageSize);

    this.httpService
      .getRequest('Get all presentation proof', '/presentation-proof/all', params)
      .then((response) => {
        if (response.ok) {
          this.proofTemplateData = response.body.content;
          this.proofTemplateDataFull = response.body.content;

          this.length = response.body.totalElements;
          this.proofTemplatesLoading = false;
          // preload attributes in background
          for (let i = 0; i < this.proofTemplateData.length; i++) {
            this.requestAttributes(i);
          }
        }
      })
      .catch(()=>{});
  }

  requestAttributes(data_index: number) {
    const proofTemplate_id = this.proofTemplateData[data_index].exchangeId;
    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('id', proofTemplate_id);

    this.httpService
      .getRequest(
        'Get proof template instance',
        '/presentation-proof/' + proofTemplate_id,
        params
      )
      .then((response) => {
        if (response.ok) {
          this.proofTemplateData[data_index].revealedAttributes = response.body.revealedAttributes;
          this.proofTemplateData[data_index].selfAttestedAttributes = response.body.selfAttestedAttributes;
        }
      })
      .catch(()=>{});
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.requestProofTemplate();
  }

  referenceStateOf(entry: any) {
    switch (entry.state) {
      case 'VERIFIED':
        return 'verified';
      case 'REQUEST_SENT':
        return 'request sent';
      case 'PRESENTATION_RECEIVED':
        return 'received';
      default:
        return entry.referenceState;
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.proofTemplateDataFull);
    console.log(this.proofTemplateData);
    console.log(filterValue);
    let filtered = [];

    for (let i = 0; i < this.proofTemplateDataFull.length; i++) {
      let product = this.proofTemplateDataFull[i];
      if (product.connectionAlias.toLowerCase().includes(filterValue.toLowerCase())) {
        filtered.push(product);
      }
    }
    this.proofTemplateData = filtered;
  }
}
