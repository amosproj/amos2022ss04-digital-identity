import {Component, Inject, isDevMode, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BackendHttpService} from "../../../services/backend-http-service/backend-http-service.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-add-dito-credential-pop-up',
  templateUrl: './add-dito-credential-pop-up.component.html',
  styleUrls: ['./add-dito-credential-pop-up.component.css']
})

export class AddDIToCredentialPopUpComponent implements OnInit {
  public DIData :any[] = []
  private cancelButtonString!: string;
  private schemaData: any;
  private id: string;
  private schemaId: string;
  public filteredSchemas: any;
  public selectedId: string = "";
  public attributesData:any = [];
  public alias: string;

  attributeFormGroup!: FormGroup;

  public DICtrl: FormControl = new FormControl();
  public DIFilterCtrl: FormControl = new FormControl();

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;
  public schema: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDIToCredentialPopUpComponent>,
    private HttpService: BackendHttpService,
    @Inject(MAT_DIALOG_DATA) private data: { id: string, schemaId:string, alias:string }
  ) {
    if (isDevMode()) {
      this.cancelButtonString = 'Ney!';
    }
    this.id = data.id;
    this.schemaId = data.schemaId;
    this.alias = data.alias;
  }

  async ngOnInit() {
    this.schema = await this.getSchemaByID(this.schemaId);
    this.getDI();
    this.schema.attributes.forEach((attribute: any)=>{
      let objAttribute:any = {};
      objAttribute.key = attribute;
      objAttribute.value = '';
      this.attributesData.push(objAttribute);

    });
  }

  getDI() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest("Get all connection","/connection/all",params)
      .then(
        response => {
          if (response.ok) {
            this.DIData = response.body;
            console.log(this.DIData)
          }
        }
      )
      .catch(response => {console.log("error"); console.log(response)})
  }

  getSchema() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest("Get all schemas","/schema/all",params)
      .then(
        response => {
          if (response.ok) {
            this.schemaData = response.body
            this.filteredSchemas = this.schemaData.slice();
          }
        }
      )
      .catch(response => {console.log("error"); console.log(response)})
  }

  async getSchemaByID(schemaID: string) {
    const params = new HttpParams().append('authorization', 'passing');
    let response = await this.HttpService.getRequest("Get all schemas","/schema/all",params)
    if (response.ok) {
      this.schemaData = response.body
      this.filteredSchemas = this.schemaData.slice();
      for (let schema of this.filteredSchemas) {
        if (schema.id == schemaID) {
          console.log(schema);
          return schema;
        } else {
          console.log("Schema with this ID not found");
        }
      }
    }
  }

  getSelectedDI(event: any){
    this.selectedId = event.value;
    console.log(event);
  }

  cancelButtonEvent() {
    this.dialogRef.close();
  }
}
