import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

export interface attribute {
  attribID: number;
  name: string;
  value: string | number | Date;
  type: 'String' | 'Number' | 'Email' | 'Date';
}

export interface proofTemplate {
  // iconUrl: string;
  name: string;
  version: string;
  credDefs:[];
  attributes: attribute[];
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

  // proofTemplateTmp: proofTemplate = { iconUrl: '', name: '', version: '', attributes: [] };
  // proofTemplate: proofTemplate = { iconUrl: '', name: '', version: '', attributes: [] };
  proofTemplateTmp: proofTemplate = { name: '', version: '', credDefs:[], attributes: [] };
  proofTemplate: proofTemplate = { name: '', version: '', credDefs:[], attributes: [] };
  requestInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private HttpService: BackendHttpService
  ) {
    this.proofTemplateFormGroup = this.fb.group({
      // iconUrl: ['../../assets/images/DIdentity.png', Validators.required],
      name: ['', Validators.required],
      version: ['', [Validators.required, versionValidator()]],
      nextType: ['String'],
      credDefs: new FormArray([]),
      attributes: new FormArray([]),
    });
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  ngOnInit(): void {}

  saveType() {
    this.nextType = this.proofTemplateFormGroup.value['nextType'];
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
          name: ['', Validators.required],
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
          name: ['', [Validators.required]],
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
          name: ['', Validators.required],
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
          name: ['', Validators.required],
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

  credentialDefinitionEmpty () {
    return this.proofTemplateFormGroup.value['credDefs'] == null || this.proofTemplateFormGroup.value['credDefs'].length == 0
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

      let oldNameValue = this.proofTemplateFormGroup.value['attributes'][idx]['name'];
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
        this.proofTemplateTmp.attributes[i] = this.proofTemplateTmp.attributes[i + 1];
        this.proofTemplateTmp.attributes[i].attribID -= 1;
      }
      this.proofTemplateTmp.attributes.pop();
    }
    (<FormArray>this.proofTemplateFormGroup.controls['attributes']).removeAt(idx);
  }

  get attributes(): FormArray {
    return <FormArray>this.proofTemplateFormGroup.get('attributes');
  }

  createProofTemplateButtonEvent() {
    this.proofTemplateTmp.name = this.proofTemplateFormGroup.value['name'];
    this.proofTemplateTmp.version = this.proofTemplateFormGroup.value['version'];
    // this.proofTemplateTmp.iconUrl = this.proofTemplateFormGroup.value['iconUrl'];
    for (let elem of this.proofTemplateTmp.attributes) {
      elem.name =
        this.proofTemplateFormGroup.value['attributes'][elem.attribID]['name'];
    }
    this.proofTemplate.name = this.proofTemplateTmp.name;
    this.proofTemplate.version = this.proofTemplateTmp.version;
    // this.proofTemplate.iconUrl = this.proofTemplateTmp.iconUrl;

    for (let i = 0; i < this.proofTemplateTmp.attributes.length; i++) {
      if (i >= this.proofTemplate.attributes.length) {
        this.proofTemplate.attributes.push({
          attribID: i,
          name: '',
          value: '',
          type: 'String',
        });
      }
      this.proofTemplate.attributes[i].name = this.proofTemplateTmp.attributes[i].name;
      this.proofTemplate.attributes[i].type = this.proofTemplateTmp.attributes[i].type;
      this.proofTemplate.attributes[i].attribID =
        this.proofTemplateTmp.attributes[i].attribID;
      this.proofTemplate.attributes[i].value = this.proofTemplateTmp.attributes[i].value;
    }

    let maxi: any =
      this.proofTemplate.attributes.length - this.proofTemplateTmp.attributes.length;
    for (let i = 0; i < maxi; i++) {
      this.proofTemplate.attributes.pop();
    }
    let params = this.proofTemplateToHttpParams(this.proofTemplate);
    this.postProofTemplate(params);
  }

  postProofTemplate(params: HttpParams): void {
    this.requestInProgress = true;
    this.HttpService.postRequest(
      'create proof template',
      '/proofTemplate/create',
      this.proofTemplateFormGroup.value,
      params
    )
      .then((response) => {
        if (!response.ok) {
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Process failed',
              text: 'Error ' + response.status + ' \n' + response.error,
            },
          });
          this.requestInProgress = false;
        } else {
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Creating of proof template was successful',
              text: 'Server response: ' + response.body,
            },
          });
          this.requestInProgress = false;
        }
      })
      .catch((response) => {
        if (isDevMode()) {
          console.log('error');
          console.log(response);
        }
        this.requestInProgress = false;
      });
  }

  proofTemplateToHttpParams(proofTemplate: proofTemplate): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('name', proofTemplate.name);
    params = params.append('version', proofTemplate.version);
    // params = params.append('imageUrl', proofTemplate.iconUrl);
    // params = params.append('attributes', JSON.stringify(proofTemplate.attributes));
    // build attribute param string: "attr1", "attr2" , ...
    let s: string = '';

    proofTemplate.attributes.forEach((att) => {
      if (s == '') {
        s += '"' + att.name + '"';
      } else {
        s += ', "' + att.name + '"';
      }
    });
    params = params.append('attributes', s);

    return params;
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
}
