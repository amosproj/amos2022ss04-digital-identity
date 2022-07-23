import { HttpParams } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Component, Inject, isDevMode } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { TimestampConverter } from 'src/app/services/timestamp-converter/timestamp-converter.service';
import { AddDIToCredentialPopUpComponent } from 'src/app/shared/pop-up/add-dito-credential-pop-up/add-dito-credential-pop-up.component';

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
}
@Component({
  selector: 'app-di-detail-pop-up',
  templateUrl: './di-detail-pop-up.component.html',
  styleUrls: ['./di-detail-pop-up.component.css']
})
export class DiDetailPopUpComponent {
  di: any;
  credentialData: credential[] = [];
  displayedAttributeColumns = ['name', 'value'];
  credentialsLoading: boolean = false;

  // MatPaginator Inputs
  pageIndex = 0;
  length = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

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
    this.pageEvent.length = this.length;

    this.requestCredentials();
  }

  // ========
  // Request Events
  // ========

  requestCredentials() {
    console.log(this.di)
    this.credentialsLoading = true;

    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('connectionId', this.di.connectionId)
      .append('page', this.pageIndex)
      .append('size', this.pageSize);

    this.httpService
      .getRequest('Get all credentials for di', '/credential/overview', params)
      .then((response) => {
        if (response.ok) {
          this.credentialData = response.body.content;
          this.length = response.body.totalElements;
          this.credentialsLoading = false;
          // preload attributes in background
          for (let i = 0; i < this.credentialData.length; i++) {
            this.requestAttributes(i);
          }
        }
      })
      .catch(() => {});
  }

  requestAttributes(data_index: number) {
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

  // ========
  // Events
  // ========

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.requestCredentials();
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
