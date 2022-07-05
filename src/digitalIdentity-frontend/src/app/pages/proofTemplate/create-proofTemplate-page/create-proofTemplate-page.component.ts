import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core'; //prettier-ignore
import {  FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators,} from '@angular/forms'; //prettier-ignore
import { MatDialog } from '@angular/material/dialog';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { Router } from '@angular/router';
export interface attribute {
  attribID: number;
  name: string;
  value: string | number | Date;
  type: 'String' | 'Number' | 'Email' | 'Date';
}

export interface proofTemplate {
  name: string;
  version: string;
  credDefs: any[];
  credDefStringAttributes: string;
  credDefStringPredicates: string;
  attributes: any[];
  image: File | null;
}

export function attribNameValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    if (control.pristine) {
      return null;
    }
    if (/^[a-zA-Z0-9]*$/.test(control.value)) {
      return null;
    } else {
      return { message: 'falseFormat' };
    }
  };
}

export function versionValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    if (control.pristine) {
      return null;
    }
    if (/^\d+(\.?\d+)*$/.test(control.value)) {
      return null;
    } else {
      return { message: 'falseFormat' };
    }
  };
}

@Component({
  selector: 'app-create-proofTemplate-page',
  templateUrl: './create-proofTemplate-page.component.html',
  styleUrls: ['./create-proofTemplate-page.component.css'],
})
export class CreateProofTemplatePageComponent implements OnInit {
  formFilled: boolean = true;
  nextType = 'String';
  types = ['String', 'Email', 'Number', 'Date'];
  proofTemplateFormGroup: FormGroup;

  proofTemplateTmp: proofTemplate = {
    name: '',
    version: '',
    credDefs: [],
    credDefStringAttributes: '',
    credDefStringPredicates: '',
    attributes: [],
    image: null,
  };
  proofTemplate: proofTemplate = {
    name: '',
    version: '',
    credDefs: [],
    credDefStringAttributes: '',
    credDefStringPredicates: '',
    attributes: [],
    image: null,
  };
  requestInProgress: boolean = false;

  displayedColumnNames: string[] = ['Checkbox', 'Name', 'expandable'];
  internalColumnNames: string[] = ['checkbox', 'alias', 'expandable'];
  selectableCols: string[] = ['all', 'alias'];
  displayedColSelectNames: string[] = ['All', 'Name'];

  filterParams: string[] = [
    'no filter',
    'greater than',
    'less than',
    'greater equal than',
    'less equal than',
  ];

  selection: any[] = [];
  additionalData: any[] = [];
  tableValid: boolean = false;

  credDefData: any[] = [];
  schemaData: any[] = [];
  schemaDataAttributes: any[] = [];
  credDefsLoaded = false;
  schemasLoaded = false;
  dataLoaded: boolean = false;

  error = '';
  fileName = '';

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialog,
    public httpService: BackendHttpService,
    public router: Router,
  ) {
    this.initCredDefTable();
    this.getAllSchemas();
    this.proofTemplateFormGroup = this.fb.group({
      name: ['', Validators.required],
      version: ['', [Validators.required, versionValidator()]],
      nextType: ['String'],
      attributes: new FormArray([]),
      image: [],
    });
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  ngOnInit(): void {}

  saveType() {
    this.nextType = this.proofTemplateFormGroup.value['nextType'];
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
          this.credDefsLoaded = true;
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

  getAttributesAndPredicates() {
    this.proofTemplate.credDefs = [];
    let attributes: any[] = [];
    let predicates: any[] = [];
    for (let i = 0; i < this.selection.length; i++) {
      let attributesTmp: any[] = [];
      let predicatesTmp: any[] = [];
      this.proofTemplate.credDefs.push(this.selection[i]);
      let schemaIdx = 0;
      for (let j = 0; j < this.schemaData.length; j++) {
        if (this.schemaData[j].id == this.selection[i].schemaId) {
          schemaIdx = j;
          break;
        }
      }

      let credDefIdx = 0;
      for (let j = 0; j < this.credDefData.length; j++) {
        if (this.credDefData[j].id == this.selection[i].id) {
          credDefIdx = j;
          break;
        }
      }
      //switch between attributes and predicates
      for (let j = 0; j < this.schemaData[schemaIdx].attributes.length; j++) {
        let tmp = this.additionalData[credDefIdx];
        let tmp2 = tmp[this.schemaData[schemaIdx].attributes[j]];
        if (tmp2.selected && tmp2.filter == 'no filter') {
          attributesTmp.push(this.schemaData[schemaIdx].attributes[j]);
        } else if (tmp2.selected) {
          let filter: string = '';
          switch (tmp2.filter) {
            case 'greater than':
              filter = '>';
              break;
            case 'less than':
              filter = '<';
              break;
            case 'greater equal than':
              filter = '>=';
              break;
            case 'less equal than':
              filter = '<=';
              break;
            default:
              filter = '';
              break;
          }
          predicatesTmp.push({
            name: this.schemaData[schemaIdx].attributes[j],
            filter: filter,
            value: tmp2.value,
          });
        }
      }
      attributes.push(attributesTmp);
      predicates.push(predicatesTmp);
    }
    return {
      attributes: attributes,
      predicates: predicates,
    };
  }
  selectionChanged() {
    let attributesAndPredicates = this.getAttributesAndPredicates();
    let attributes = attributesAndPredicates.attributes;
    let predicates = attributesAndPredicates.predicates;

    //create requestedAttributeString
    let attrTmp: any = {};
    for (let i = 0; i < this.proofTemplate.credDefs.length; i++) {
      if (attributes[i].length != 0) {
        let attrTmp2 = [];
        for (let j = 0; j < attributes[i].length; j++) {
          attrTmp2.push({
            attributeName: attributes[i][j],
          });
        }
        attrTmp[this.proofTemplate.credDefs[i].id] = {
          attributeNames: attrTmp2,
        };
      }
    }
    this.proofTemplate.credDefStringAttributes = JSON.stringify(attrTmp);

    //create requestedPredicateString
    let predTmp: any = {};
    for (let i = 0; i < this.proofTemplate.credDefs.length; i++) {
      if (predicates[i].length != 0) {
        let predTmp2 = [];
        for (let j = 0; j < predicates[i].length; j++) {
          predTmp2.push({
            predicateName: predicates[i][j].name,
            predicateType: predicates[i][j].filter,
            predicateValue: predicates[i][j].value,
          });
        }
        predTmp[this.proofTemplate.credDefs[i].id] = predTmp2;
      }
    }
    this.proofTemplate.credDefStringPredicates = JSON.stringify(predTmp);


  }

  addAttribute() {
    this.saveType();
    this.attributes.push(this.newAttribute(this.nextType));
  }

  newAttribute(type: String): FormGroup {
    let attribSize = this.proofTemplateTmp.attributes.length;
    switch (type) {
      case 'String':
        this.proofTemplateTmp.attributes.push({
          attribID: attribSize,
          name: '',
          value: '',
          type: 'String',
        });
        return this.fb.group({
          name: ['', [Validators.required, attribNameValidator()]],
          attributeType: ['String'],
        });
      case 'Email':
        this.proofTemplateTmp.attributes.push({
          attribID: attribSize,
          name: '',
          value: '',
          type: 'Email',
        });
        return this.fb.group({
          name: ['', [Validators.required, attribNameValidator()]],
          attributeType: ['Email'],
        });
      case 'Number':
        this.proofTemplateTmp.attributes.push({
          attribID: attribSize,
          name: '',
          value: NaN,
          type: 'Number',
        });
        return this.fb.group({
          name: ['', [Validators.required, attribNameValidator()]],
          attributeType: ['Number'],
        });
      case 'Date':
        this.proofTemplateTmp.attributes.push({
          attribID: attribSize,
          name: '',
          value: new Date(),
          type: 'Date',
        });
        return this.fb.group({
          name: ['', [Validators.required, attribNameValidator()]],
          attributeType: ['Date'],
        });
      default:
        this.proofTemplateTmp.attributes.push({
          attribID: attribSize,
          name: '',
          value: '',
          type: 'String',
        });
        return this.fb.group({
          name: ['', Validators.required],
          attributeType: ['String'],
        });
    }
  }

  credentialDefinitionEmpty() {
    return (
      this.proofTemplate.credDefs == null ||
      this.proofTemplate.credDefs.length == 0
    );
  }

  switchAttributeValue(idx: number) {
    let newType =
      this.proofTemplateFormGroup.value['attributes'][idx]['attributeType'];
    if (
      newType == 'String' ||
      newType == 'Email' ||
      newType == 'Date' ||
      newType == 'Number'
    ) {
      this.proofTemplateTmp.attributes[idx].name = '';
      this.proofTemplateTmp.attributes[idx].type = newType;

      let oldNameValue =
        this.proofTemplateFormGroup.value['attributes'][idx]['name'];
      (<FormArray>this.proofTemplateFormGroup.controls['attributes'])
        .at(idx)
        .setValue({
          name: oldNameValue,
          attributeType: newType,
        });
    }
  }

  deleteAttribute(idx: number) {
    if (idx == this.proofTemplateTmp.attributes.length - 1) {
      this.proofTemplateTmp.attributes.pop(); //remove last element
    } else if (idx < this.proofTemplateTmp.attributes.length) {
      for (let i = idx; i < this.proofTemplateTmp.attributes.length - 1; i++) {
        this.proofTemplateTmp.attributes[i] =
          this.proofTemplateTmp.attributes[i + 1];
        this.proofTemplateTmp.attributes[i].attribID -= 1;
      }
      this.proofTemplateTmp.attributes.pop();
    }
    (<FormArray>this.proofTemplateFormGroup.controls['attributes']).removeAt(
      idx
    );
  }

  get attributes(): FormArray {
    return <FormArray>this.proofTemplateFormGroup.get('attributes');
  }

  createProofTemplateButtonEvent() {
    //set TmpProofTemplate again
    this.proofTemplateTmp.name = this.proofTemplateFormGroup.value['name'];
    this.proofTemplateTmp.version =
      this.proofTemplateFormGroup.value['version'];
    for (let elem of this.proofTemplateTmp.attributes) {
      elem.name =
        this.proofTemplateFormGroup.value['attributes'][elem.attribID]['name'];
    }

    //set real proofTemplate
    this.proofTemplate.name = this.proofTemplateTmp.name;
    this.proofTemplate.version = this.proofTemplateTmp.version;

    for (let i = 0; i < this.proofTemplateTmp.attributes.length; i++) {
      if (i >= this.proofTemplate.attributes.length) {
        this.proofTemplate.attributes.push({
          attributeName: '',
        });
      }
      this.proofTemplate.attributes[i].attributeName =
        this.proofTemplateTmp.attributes[i].name;
    }
    let maxi: any =
      this.proofTemplate.attributes.length -
      this.proofTemplateTmp.attributes.length;
    for (let i = 0; i < maxi; i++) {
      this.proofTemplate.attributes.pop();
    }
    let params = this.proofTemplateToHttpParams(this.proofTemplate);
    // let imageFormData = this.imageToHttpBody(this.proofTemplate); // will be used for sending image file
    this.postProofTemplate(params);
  }

  postProofTemplate(params: HttpParams): void {
    this.requestInProgress = true;
    this.httpService
      .postRequest(
        'create proof template',
        '/proof-template/create',
        this.proofTemplateFormGroup.value,
        params
      )
      .then((response) => {
        if (response.ok) {
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Creating of proof template was successful',
              text: 'Server response: ' + response.body,
            },
          });
          this.requestInProgress = false;
        } else {
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Process failed',
              text: 'Error ' + response.status + ' \n' + response.error,
            },
          });
          this.router.navigate(['/proofTemplate-overview']);
          this.requestInProgress = false;
        }
      })
      .catch((response) => {
        if (isDevMode()) {
          console.log('error');
          console.log(response);
        }
        this.dialogRef.open(InformationPopUpComponent, {
          data: {
            header: 'Process failed',
            text: 'Error ' + response.status + ' \n' + response.error,
          },
        });
        this.requestInProgress = false;
      });
  }

  proofTemplateToHttpParams(proofTemplate: proofTemplate): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('name', proofTemplate.name);
    params = params.append('version', proofTemplate.version);
    params = params.append('requestedAttributes', proofTemplate.credDefStringAttributes); //prettier-ignore
    params = params.append('requestedPredicates', proofTemplate.credDefStringPredicates); //prettier-ignore
    params = params.append('requestedSelfAttestedAttributes', JSON.stringify(proofTemplate.attributes)); //prettier-ignore
    return params;
  }

  imageToHttpBody(proofTemplate: proofTemplate) {
    let formData: FormData = new FormData();
    if (proofTemplate.image != null) {
      formData.append('image', proofTemplate.image);
    }
    return formData;
  }

  //opens a PopUp window of class InformationPopUpComponent
  openDialog(header: string, text: string) {
    this.dialogRef.open(InformationPopUpComponent, {
      data: {
        header: header,
        text: text,
      },
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

  selectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.proofTemplate.image = event.target.files[0];
      if (isDevMode()) {
        console.log('proofTemplate', this.proofTemplate);
      }
    } else {
      this.proofTemplate.image = null;
    }

    this.error = '';

    let fileType = event.target.files[0].type;

    if (fileType.match(/image\/*/) == null) {
      this.error = 'Only images are supported.';
      return;
    }

    this.fileName = event.target.files[0].name;

    // let reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);

    // reader.onload = (_event) => {
    //   this.proofTemplateFormGroup.controls['iconUrl'].setValue(reader.result); //the url of the uploaded image is here
    // };
  }
}
