import { Component, Inject, isDevMode, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BackendHttpService } from '../../../services/backend-http-service/backend-http-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { InformationPopUpComponent } from '../information-pop-up/information-pop-up.component';

@Component({
  selector: 'app-add-dito-credential-pop-up',
  templateUrl: './add-dito-credential-pop-up.component.html',
  styleUrls: ['./add-dito-credential-pop-up.component.css'],
})
export class AddDIToCredentialPopUpComponent implements OnInit {
  public DIData: any[] = [];
  private cancelButtonString!: string;
  private schemaData: any;
  private id: string;
  private schemaId: string;
  public filteredSchemas: any;
  public selectedId: string = '';
  public attributesData: any = [];
  public alias: string;

  attributeFormGroup!: FormGroup;

  public DICtrl: FormControl = new FormControl();
  public DIFilterCtrl: FormControl = new FormControl();

  @ViewChild('singleSelect', { static: true }) singleSelect:
    | MatSelect
    | undefined;
  public schema: any;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDIToCredentialPopUpComponent>,
    public HttpService: BackendHttpService,
    public dialog_Ref: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    private data: { id: string; schemaId: string; alias: string }
  ) {
    if (isDevMode()) {
      this.cancelButtonString = 'Ney!';
    }
    this.id = data.id;
    this.schemaId = data.schemaId;
    this.alias = data.alias;

    this.attributeFormGroup = this.fb.group({
      connection: [null, Validators.required],
      attributes: [null],
    });
  }

  async ngOnInit() {
    this.schema = await this.getSchemaByID(this.schemaId);
    this.getDI();
    this.schema.attributes.forEach((attribute: any) => {
      let objAttribute: any = {};
      objAttribute.name = attribute;
      objAttribute.value = '';
      this.attributesData.push(objAttribute);
    });
  }

  getDI() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest('Get all connection', '/connection/all', params)
      .then((response) => {
        if (response.ok) {
          this.DIData = response.body;
          console.log(this.DIData);
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  getSchemaData(){
    return this.schemaData;
  }

  getSchema() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest('Get all schemas', '/schema/all', params)
      .then((response) => {
        if (response.ok) {
          this.schemaData = response.body;
          this.filteredSchemas = this.schemaData.slice();
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  async getSchemaByID(schemaID: string) {
    const params = new HttpParams().append('authorization', 'passing');
    let response = await this.HttpService.getRequest(
      'Get all schemas',
      '/schema/all',
      params
    );
    if (response.ok) {
      this.schemaData = response.body;
      this.filteredSchemas = this.schemaData.slice();
      for (let schema of this.filteredSchemas) {
        if (schema.id == schemaID) {
          console.log(schema);
          return schema;
        } else {
          console.log('Schema with this ID not found');
        }
      }
    }
  }

  getSelectedDI(event: any) {
    this.selectedId = event.value;
    console.log(event);
    console.log(this.selectedId);
  }

  cancelButtonEvent() {
    this.dialogRef.close();
  }

  async save() {
    let params = new HttpParams().append('authorization', 'passing');
    params = params.append('connectionId', this.selectedId);
    params = params.append('credentialDefinitionId', this.id);

    await this.HttpService.postRequest(
      'Issue a credential to an existing connection',
      '/credential/issue',
      this.attributesData,
      params
    )
      .then((response) => {
        if (response.ok) {
          this.dialog_Ref.open(InformationPopUpComponent, {
            data: {
              header: 'Success!',
              text: 'The credential was successfully issued to the connection.',
            },
          });
          this.dialogRef.close();
        } else {
          this.dialog_Ref.open(InformationPopUpComponent, {
            data: {
              header: 'Process failed',
              text: 'Error ' + response.status + ' \n' + response.error,
            },
          });
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  isActive(DI: any): boolean {
    return DI.state == 'COMPLETED' || DI.state == 'RESPONDED'; //TODO: REQUESTED ?
  }
}
