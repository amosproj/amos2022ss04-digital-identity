import { ViewEncapsulation } from '@angular/core';
import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TimestampCoverter } from 'src/app/services/timestamp-converter/timestamp-converter.service';

@Component({
  selector: 'app-cred-def-detail-pop-up',
  templateUrl: './cred-def-detail-pop-up.component.html',
  styleUrls: ['./cred-def-detail-pop-up.component.css'],
  encapsulation: ViewEncapsulation.None, // disable ViewEncapsulation
})
export class CredDefDetailPopUpComponent {
  credDef: any;
  data = dummyData;
  timestampConverter: TimestampCoverter;
  displayedAttributeColumns = ['name', 'value'];

  // MatPaginator Inputs
  pageIndex = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(
    public thisDialogRef: MatDialogRef<CredDefDetailPopUpComponent>,
    public dialogRef: MatDialog,
    public tsConverter: TimestampCoverter,
    @Inject(MAT_DIALOG_DATA)
    public params: { credDef: any; addDItoCredDef: () => void }
  ) {
    this.credDef = params.credDef;
    this.timestampConverter = tsConverter;
    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = this.length;
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.length = event.length;
    this.pageSize = event.pageSize;
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
    if (entry.referenceState == 'CREDENTIAL_ISSUED') {
      return 'credential accepted';
    }

    if (entry.referenceState == 'CREDENTIAL_OFFER_SENT') {
      return 'credential over sent';
    }

    if (entry.referenceState == 'CREDENTIAL_REMOVED') {
      return 'credential removed';
    }

    return entry.referenceState;
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
    referenceState: 'CREDENTIAL_ISSUED',
    timestamp: '2022-06-29T10:40:14',
    attributes: dummyAttributes,
  },
  {
    connectionAlias: 'Arnulf',
    referenceName: 'Ausweiskontrolle321',
    referenceState: 'CREDENTIAL_OFFER_SENT',
    timestamp: '2022-07-01T10:40:14',
    attributes: dummyAttributes,
  },
  {
    connectionAlias: 'Sarazin',
    referenceName: 'Ausweiskontrolle321',
    referenceState: 'CREDENTIAL_REMOVED',
    timestamp: '2022-07-01T11:53:14',
    attributes: dummyAttributes,
  },
];
