import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-create-proof-template-step3b',
  templateUrl: './create-proof-template-step3b.component.html',
  styleUrls: ['./create-proof-template-step3b.component.css'],
})
export class CreateProofTemplateStep3bComponent implements OnInit {
  filterText: string = '';
  goalCredDef!: any;

  credDefData: any[] = [];
  presentedCredDefs: any[] = [];
  loading: boolean = true;

  constructor(public httpService: BackendHttpService) {
    this.fetchCredDefData();
  }

  ngOnInit(): void {}

  fetchCredDefData() {
    const params = new HttpParams().append('authorization', 'passing');
    this.httpService
      .getRequest(
        'Get all credential definitions',
        '/credential-definition/all',
        params
      )
      .then((response) => {
        if (response.ok) {
          this.credDefData = response.body;
          this.presentedCredDefs = this.credDefData;
          this.loading = false;
        }
      });
  }

  applyFilter() {
    //TODO: refactor/enhance this code as it could be unefficient for huge datasets
    // maybe one could use tableDataSource without actually displaying the table
    this.presentedCredDefs = this.credDefData.filter(this.stringFilter, this);
  }

  stringFilter(credDef: any) {
    let alias = credDef.alias.toLowerCase();
    let filter = this.filterText.toLowerCase();

    return alias.indexOf(filter) != -1;
  }

  log() {
    console.log(this);
  }
}
