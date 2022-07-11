import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { linkedAttribute } from '../../create-proof-template.module';
import { AutoIssueLinkAttrService } from '../../services/auto-issue-link-attr.service';

@Component({
  selector: 'app-cpt-step3b',
  templateUrl: './cpt-step3b.component.html',
  styleUrls: ['./cpt-step3b.component.css'],
})
export class CptStep3bComponent implements OnInit {
  @Input()
  selectedCredDef!: any;
  @Input()
  selectedAttributes!: any;

  filterText: string = '';
  goalCredDef: any = undefined;
  goalAttributes: string[] = [];

  tableAttrData: linkedAttribute[] = [];
  displayedColumns = ['attribute', 'source'];
  loadingAttributes: boolean = true;

  credDefData: any[] = [];
  presentedCredDefs: any[] = [];
  loading: boolean = true;

  constructor(
    private httpService: BackendHttpService,
    private linker: AutoIssueLinkAttrService
  ) {
    this.fetchCredDefData();
  }

  ngOnInit(): void {}

  completed(): boolean {
    return this.loadingAttributes == false;
  }

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

  goalCredDefChanged() {
    this.loadingAttributes = true;
    this.fetchAttributes().then((response) => {
      this.goalAttributes = response.body.attributes;
      this.linker.matchAttributes(
        this.goalAttributes,
        this.selectedCredDef,
        this.selectedAttributes
      );
      this.loadingAttributes = false;
    });
  }

  private fetchAttributes() {
    let schemaId = this.goalCredDef.schemaId;
    const params = new HttpParams()
      .append('authorization', 'passing')
      .append('id', schemaId);

    return this.httpService.getRequest(
      'Get all credential definitions',
      '/schema/' + schemaId,
      params
    );
  }
}
