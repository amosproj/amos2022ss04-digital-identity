import { HttpParams } from '@angular/common/http';
import { Component, Input, isDevMode } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { TimestampConverter } from 'src/app/services/timestamp-converter/timestamp-converter.service';

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

  @Input() cred_def_id: string = '';

  // MatPaginator Inputs
  pageIndex = 0;
  length = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  constructor(
    public timestampConverter: TimestampConverter,
    public httpService: BackendHttpService
  ) {}

  handleChangeTab(event: MatTabChangeEvent) {
    if (event.tab.textLabel == 'Activities') {
      this.requestActivities();
    }
  }

  requestActivities() {
    const params = new HttpParams()
      .append('credentialDefinitionId', this.cred_def_id)
      .append('page', this.pageIndex)
      .append('size', this.pageSize);

    this.httpService
      .getRequest('Get activities for credential', '/credential/log', params)
      .then((response) => {
        if (response.ok) {
          if (isDevMode()) {
            console.log(response);
          }
          this.activitiyData = response.body.content;
          this.length = response.body.totalElements;
        }
      })
      .catch(() => {});
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.requestActivities();
  }
}
