import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-create-proof-template-step2',
  templateUrl: './create-proof-template-step2.component.html',
  styleUrls: ['./create-proof-template-step2.component.css'],
})
export class CreateProofTemplateStep2Component implements OnInit {
  formGroup!: FormGroup;

  // TODO: fix typing
  credDefSelections: any[] = [];
  additionalData: any[] = [];
  tableValid: boolean = false;

  // table data
  credDefData: any[] = [];
  schemaData: any[] = [];
  schemaDataAttributes: any[] = [];
  credDefsLoaded = false;
  schemasLoaded = false;
  dataLoaded: boolean = false;

  // table definition
  // displayedColumnNames: string[] = ['Checkbox', 'Name', 'expandable'];
  // internalColumnNames: string[] = ['checkbox', 'alias', 'expandable'];
  displayedColumnNames: string[] = ['Name', 'expandable'];
  internalColumnNames: string[] = ['alias', 'expandable'];
  selectableCols: string[] = ['all', 'alias'];
  displayedColSelectNames: string[] = ['All', 'Name'];

  filterParams: string[] = [
    'no filter',
    'greater than',
    'less than',
    'greater equal than',
    'less equal than',
  ];

  constructor(public httpService: BackendHttpService) {
    this.initCredDefTable();
    this.getAllSchemas();
  }

  ngOnInit(): void {}

  completed(): boolean {
    return true;
  }

  initCredDefTable() {
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
          console.log(this.credDefData);
          this.credDefsLoaded = true;
          // this.dataLoaded = true;
          this.dataLoaded = this.schemasLoaded && this.credDefsLoaded;
          if (this.dataLoaded) {
            this.matchSchemaAttributesToCredDefs();
          }
        }
      });
  }

  getAllSchemas() {
    const params = new HttpParams().append('authorization', 'passing');
    this.httpService
      .getRequest('Get all schemas', '/schema/all', params)
      .then((response) => {
        if (response.ok) {
          this.schemaData = response.body;
          this.schemasLoaded = true;
          this.dataLoaded = this.schemasLoaded && this.credDefsLoaded;
          if (this.dataLoaded) {
            this.matchSchemaAttributesToCredDefs();
          }
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  matchSchemaAttributesToCredDefs() {
    this.schemaDataAttributes = [];
    for (let i = 0; i < this.credDefData.length; i++) {
      let schemaId = this.credDefData[i].schemaId;
      let schema = this.schemaData.find((x) => x.id == schemaId);
      let attributes = schema.attributes;
      let alias = schema.alias;
      this.schemaDataAttributes.push({
        schemaId: schemaId,
        alias: alias,
        attributes: attributes,
      });
    }
    if (isDevMode()) {
      console.log('credDef - schema attributes', this.schemaDataAttributes);
    }
  }

  selectionChanged() {
    console.log(this.credDefSelections);
    console.log(this.additionalData);
  }
}
