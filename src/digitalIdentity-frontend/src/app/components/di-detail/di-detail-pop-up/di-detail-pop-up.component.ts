import { HttpParams } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Component, Inject, isDevMode } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { TimestampConverter } from 'src/app/services/timestamp-converter/timestamp-converter.service';

export interface attribute {
  name: string;
  value: string;
}
export interface credential {
  id: string;
  connectionAlias: string;
  referenceName: string;
  state: string;
  updatedAt: string;
  attributes: attribute[];
  credDefAlias: string;
}

export interface proofTemplate {
  revealedAttributes: Map<string, attribute[]>;
  selfAttestedAttributes: attribute[];
  exchangeId: string;
  templateId: string;
  connectionAlias: string;
  templateName: string;
  state: string;
  updatedAt: string;
}

@Component({
  selector: 'app-di-detail-pop-up',
  templateUrl: './di-detail-pop-up.component.html',
  styleUrls: ['./di-detail-pop-up.component.css']
})
export class DiDetailPopUpComponent {
  di: any;
  displayedAttributeColumns = ['name', 'value'];

  credentialData: credential[] = [];
  credentialsLoading: boolean = false;

  proofTemplateData: proofTemplate[] = [];
  proofTemplateDataFull: proofTemplate[] = [];
  displayedSelfAttestedAttributeColumns = ['name', 'value'];
  proofTemplatesLoading: boolean = false;

  // MatPaginator Inputs
  pageIndex = 0;
  lengthCredentials = 100;
  lengthProofs = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage: 'Credentials' | 'Proofs' = 'Credentials'

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(
    public thisDialogRef: MatDialogRef<DiDetailPopUpComponent>,
    public dialogRef: MatDialog,
    public timestampConverter: TimestampConverter,
    public httpService: BackendHttpService,
    @Inject(MAT_DIALOG_DATA)
    public params: {
      di: any;
    }
  ) {
    this.di = params.di;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = this.lengthCredentials;

    this.requestCredentials();
    this.requestProofs();
  }

  // ========
  // Request Events
  // ========

  requestCredentials() {
    console.log(this.di)
    this.credentialsLoading = true;

    const params = new HttpParams()
    .append('connectionId', this.di.connectionId)
    .append('page', this.pageIndex)
    .append('size', this.pageSize)
    .append('authorization', 'passing');

    this.httpService
      .getRequest('Get all credentials for di', '/credential/overview', params)
      .then((response) => {
        if (response.ok) {
          this.credentialData = response.body.content;
          this.lengthCredentials = response.body.totalElements;
          this.credentialsLoading = false;
          // preload attributes in background
          for (let i = 0; i < this.credentialData.length; i++) {
            this.requestAttributesCredentials(i);
          }
        }
      })
      .catch(() => {});
  }

  requestProofs() {
    this.proofTemplatesLoading = true;

    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('connectionId', this.di.connectionId)
      .append('page', this.pageIndex)
      .append('size', this.pageSize);

    this.httpService
      .getRequest(
        'Get all presentation proof',
        '/presentation-proof/overview',
        params
      )
      .then((response) => {
        if (response.ok) {
          this.proofTemplateData = response.body.content;
          this.proofTemplateDataFull = response.body.content;

          this.lengthProofs = response.body.totalElements;
          this.proofTemplatesLoading = false;
          // preload attributes in background
          for (let i = 0; i < this.proofTemplateData.length; i++) {
            this.requestAttributesProofs(i);
          }
        }
      })
      .catch(() => {});
  }

  requestAttributesCredentials(data_index: number) {
    const credential_id = this.credentialData[data_index].id;
    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('id', credential_id);

    this.httpService
      .getRequest(
        'Get credential instance',
        '/credential/' + credential_id,
        params
      )
      .then((response) => {
        if (response.ok) {
          this.credentialData[data_index].attributes = response.body.attributes;
        }
      })
      .catch(() => {});
  }

  requestAttributesProofs(data_index: number) {
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
          this.proofTemplateData[data_index].revealedAttributes =
            response.body.revealedAttributes;
          this.proofTemplateData[data_index].selfAttestedAttributes =
            response.body.selfAttestedAttributes;
        }
      })
      .catch(() => {});
  }

  // ========
  // Events
  // ========

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;

    this.pageSize = event.pageSize;
    if (this.currentPage == 'Credentials') {
      this.lengthCredentials = event.length;
      this.requestCredentials();
    }
    else if (this.currentPage == 'Proofs') {
      this.lengthProofs = event.length;
      this.requestProofs();
    }

  }

  handleChangeTab(event:MatTabChangeEvent) {
    if (event.tab.textLabel == 'Credentials') {
      this.currentPage = 'Credentials';
    }
    else if (event.tab.textLabel == 'Proofs') {
      this.currentPage = 'Proofs';
    }

    console.log("proofs",this.proofTemplateData)
    console.log("credentials",this.credentialData)
  }


  close() {
    if (isDevMode()) console.log('close window');
    this.thisDialogRef.close();
  }

  referenceStateOf(entry: any) {
    switch (entry.state) {
      case 'CREDENTIAL_ISSUED':
        return 'accepted';
      case 'CREDENTIAL_OFFER_SENT':
        return 'offer sent';
      case 'CREDENTIAL_REMOVED':
        return 'removed';
      case 'CREDENTIAL_REVOKED':
        return 'revoked';
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

}
