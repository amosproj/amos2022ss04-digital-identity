import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { TimestampCoverter } from 'src/app/services/timestamp-converter/timestamp-converter.service';

export interface activity {
  connectionAlias: string;
  connectionId: string;
  id: string;
  referenceState: string;
  timestamp: string;
}

@Component({
  selector: 'app-cred-def-activities',
  templateUrl: './cred-def-activities.component.html',
  styleUrls: ['./cred-def-activities.component.css'],
})
export class CredDefActivitiesComponent {
  activitiyData: activity[] = [];
  displayedActivitiesColumns = ['icon', 'connection', 'state', 'timestamp'];
  activitiesLoading: boolean = false;

  // MatPaginator Inputs
  pageIndex = 0;
  length = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(
    public timestampConverter: TimestampCoverter,
    public httpService: BackendHttpService
  ) {}

  handleChangeTab(event: MatTabChangeEvent, credential_id: string) {
    if (event.tab.textLabel == 'Activities') {
      this.requestActivities(credential_id);
    }
  }

  requestActivities(credential_id: string) {
    // TODO: paging activities
    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('credentialDefinitionId', credential_id);

    this.httpService
      .getRequest('Get activities for credential', '/credential/log', params)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          this.activitiyData = response.body.content;
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }
}
