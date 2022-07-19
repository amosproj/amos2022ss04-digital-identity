import { Component, Input, isDevMode, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TimestampConverter } from '../../../services/timestamp-converter/timestamp-converter.service';
import { BackendHttpService } from '../../../services/backend-http-service/backend-http-service.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HttpParams } from '@angular/common/http';
import { activity } from '../../cred-def-detail/cred-def-activities/cred-def-activities.component';

@Component({
  selector: 'app-proof-activities',
  templateUrl: './proof-activities.component.html',
  styleUrls: ['./proof-activities.component.css'],
})
export class ProofActivitiesComponent implements OnInit {
  activitiyData: activity[] = [];
  displayedActivitiesColumns = ['icon', 'connection', 'state', 'timestamp'];
  activitiesLoading: boolean = false;

  @Input() proofTemplateId: string = '';

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
      .append('authorization', 'passing')
      .append('proofTemplateId', this.proofTemplateId)
      .append('page', this.pageIndex)
      .append('size', this.pageSize);

    this.httpService
      .getRequest('Get activities for proof', '/presentation-proof/log', params)
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

  ngOnInit(): void {}
}
