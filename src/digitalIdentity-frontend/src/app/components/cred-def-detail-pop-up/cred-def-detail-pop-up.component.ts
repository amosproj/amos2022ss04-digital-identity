import { HttpParams } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { TimestampCoverter } from 'src/app/services/timestamp-converter/timestamp-converter.service';

export interface attribute {
  name: string;
  value: string;
}
export interface credential {
  connectionAlias: string;
  referenceName: string;
  state: string;
  updatedAt: string;
  attributes: attribute[];
}

@Component({
  selector: 'app-cred-def-detail-pop-up',
  templateUrl: './cred-def-detail-pop-up.component.html',
  styleUrls: ['./cred-def-detail-pop-up.component.css'],
  encapsulation: ViewEncapsulation.None, // disable ViewEncapsulation
})
export class CredDefDetailPopUpComponent {
  credDef: any;
  credentialData: credential[] = [];
  credentialsLoading: boolean = false;

  displayedAttributeColumns = ['name', 'value'];

  // MatPaginator Inputs
  pageIndex = 0;
  length = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(
    public thisDialogRef: MatDialogRef<CredDefDetailPopUpComponent>,
    public dialogRef: MatDialog,
    public timestampConverter: TimestampCoverter,
    public httpService: BackendHttpService,
    @Inject(MAT_DIALOG_DATA)
    public params: { credDef: any; addDItoCredDef: () => void }
  ) {
    this.credDef = params.credDef;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = this.length;

    this.requestCredentials();
  }

  requestCredentials() {
    this.credentialsLoading = true;

    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('credentialDefinitionId', this.credDef.id)
      .append('page', this.pageIndex)
      .append('size', this.pageSize);

    this.httpService
      .getRequest('Get all credentials for cred def', '/credential/all', params)
      .then((response) => {
        if (response.ok) {
          this.credentialData = response.body.content;
          this.length = response.body.totalElements;
          this.credentialsLoading = false;
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.requestCredentials();
  }

  openAddDIWindow() {
    if (isDevMode()) {
      console.log('open AddDI window');
    }
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
      default:
        return entry.referenceState;
    }
  }
}

const dummyAttributes = [
  { name: 'Name', value: 'Hans' },
  { name: 'Surname', value: 'Hase' },
];

const dummyData = [
  {
    connectionAlias: 'Bernd',
    referenceName: 'Ausweiskontrolle123',
    state: 'CREDENTIAL_ISSUED',
    updatedAt: '2022-06-29T10:40:14',
    attributes: dummyAttributes,
  },
  {
    connectionAlias: 'Arnulf',
    referenceName: 'Ausweiskontrolle321',
    state: 'CREDENTIAL_OFFER_SENT',
    updatedAt: '2022-07-01T10:40:14',
    attributes: dummyAttributes,
  },
  {
    connectionAlias: 'Sarazin',
    referenceName: 'Ausweiskontrolle321',
    state: 'CREDENTIAL_REMOVED',
    updatedAt: '2022-07-01T11:53:14',
    attributes: dummyAttributes,
  },
  {
    connectionAlias: 'Ninja',
    referenceName: 'Ausweiskontrolle321',
    state: 'CREDENTIAL_REVOKED',
    updatedAt: '2022-07-01T11:53:14',
    attributes: dummyAttributes,
  },
];
