import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { Router } from '@angular/router';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

export interface attribute {
  attribID: number;
  name: string;
  value: string | number | Date;
  type: 'String' | 'Number' | 'Email' | 'Date';
}

export interface schema {
  iconUrl: string;
  name: string;
  version: string;
  attributes: attribute[];
}

// not checked but maybe useful for checking values
// function dateValidator(date: string): ValidatorFn | null {
//   return control => {
//     if (!control.value) return null;
//     const dateRegEx = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{4}$/);
//     return dateRegEx.test(date) ? null : { message: 'date not correct' };
//     }
//     return null;
// }
// not checked but maybe useful for checking values
// function numberValidator(control: AbstractControl): { [key: string]: boolean } | null {
//   if (control.pristine) {
//     return null;
//   }
//   if (control.value.match(/.*\D.*/)) {
//     return { 'numeric': true };
//   }
//   return null;
// }

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
  selector: 'app-create-schema-page',
  templateUrl: './create-schema-page.component.html',
  styleUrls: ['./create-schema-page.component.css'],
})
export class CreateSchemaPageComponent implements OnInit {
  formFilled: boolean = true;
  nextType = 'String';
  types = ['String', 'Email', 'Number', 'Date'];
  schemaFormGroup: FormGroup;

  schemaTmp: schema = { iconUrl: '', name: '', version: '', attributes: [] };
  schema: schema = { iconUrl: '', name: '', version: '', attributes: [] };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router,
    private HttpService: BackendHttpService
  ) {
    this.schemaFormGroup = this.fb.group({
      iconUrl: ['../../assets/images/DIdentity.png', Validators.required],
      name: ['', Validators.required],
      version: ['', [Validators.required, versionValidator()]],
      nextType: ['String'],
      attributes: new FormArray([]),
    });
  }

  inDevelopment(): boolean {
    return isDevMode();
  }

  ngOnInit(): void {}

  saveType() {
    this.nextType = this.schemaFormGroup.value['nextType'];
  }

  addAttribute() {
    this.saveType();
    this.attributes.push(this.newAttribute(this.nextType));
  }

  newAttribute(type: String): FormGroup {
    let attribSize = this.schemaTmp.attributes.length;
    switch (type) {
      case 'String':
        this.schemaTmp.attributes.push({
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
        this.schemaTmp.attributes.push({
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
        this.schemaTmp.attributes.push({
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
        this.schemaTmp.attributes.push({
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
        this.schemaTmp.attributes.push({
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

  switchAttributeValue(idx: number) {
    let newType =
      this.schemaFormGroup.value['attributes'][idx]['attributeType'];
    if (
      newType == 'String' ||
      newType == 'Email' ||
      newType == 'Date' ||
      newType == 'Number'
    ) {
      this.schemaTmp.attributes[idx].name = '';
      this.schemaTmp.attributes[idx].type = newType;

      let oldNameValue = this.schemaFormGroup.value['attributes'][idx]['name'];
      (<FormArray>this.schemaFormGroup.controls['attributes'])
        .at(idx)
        .setValue({
          name: oldNameValue,
          attributeType: newType,
        });
    }
  }

  deleteAttribute(idx: number) {
    if (idx == this.schemaTmp.attributes.length - 1) {
      this.schemaTmp.attributes.pop(); //remove last element
    } else if (idx < this.schemaTmp.attributes.length) {
      for (let i = idx; i < this.schemaTmp.attributes.length - 1; i++) {
        this.schemaTmp.attributes[i] = this.schemaTmp.attributes[i + 1];
        this.schemaTmp.attributes[i].attribID -= 1;
      }
      this.schemaTmp.attributes.pop();
    }
    (<FormArray>this.schemaFormGroup.controls['attributes']).removeAt(idx);
  }

  get attributes(): FormArray {
    return <FormArray>this.schemaFormGroup.get('attributes');
  }

  createSchemaButtonEvent() {
    this.schemaTmp.name = this.schemaFormGroup.value['name'];
    this.schemaTmp.version = this.schemaFormGroup.value['version'];
    this.schemaTmp.iconUrl = this.schemaFormGroup.value['iconUrl'];
    for (let elem of this.schemaTmp.attributes) {
      elem.name =
        this.schemaFormGroup.value['attributes'][elem.attribID]['name'];
    }
    this.schema.name = this.schemaTmp.name;
    this.schema.version = this.schemaTmp.version;
    this.schema.iconUrl = this.schemaTmp.iconUrl;

    for (let i = 0; i < this.schemaTmp.attributes.length; i++) {
      if (i >= this.schema.attributes.length) {
        this.schema.attributes.push({
          attribID: i,
          name: '',
          value: '',
          type: 'String',
        });
      }
      this.schema.attributes[i].name = this.schemaTmp.attributes[i].name;
      this.schema.attributes[i].type = this.schemaTmp.attributes[i].type;
      this.schema.attributes[i].attribID =
        this.schemaTmp.attributes[i].attribID;
      this.schema.attributes[i].value = this.schemaTmp.attributes[i].value;
    }

    let maxi: any =
      this.schema.attributes.length - this.schemaTmp.attributes.length;
    for (let i = 0; i < maxi; i++) {
      this.schema.attributes.pop();
    }
    this.postSchema();
  }

  postSchema(): void {
    let params = this.schemaToHttpParams(this.schema);

    this.HttpService.postRequest(
      'create DI',
      '/schema/create',
      this.schema,
      params
    )
      .then((response) => {
        if (response.status == 201) {
          this.router.navigate(['/schema-overview']);
        } else {
          this.openDialog(
            'Creation not successful!',
            'Server response: ' + response.body
          );
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  schemaToHttpParams(schema: schema): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('alias', schema.name);
    params = params.append('version', schema.version);
    // params = params.append('attributes', JSON.stringify(schema.attributes));
    // build attribute param string: "attr1", "attr2" , ...
    let s: string = '';

    schema.attributes.forEach((att) => {
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
