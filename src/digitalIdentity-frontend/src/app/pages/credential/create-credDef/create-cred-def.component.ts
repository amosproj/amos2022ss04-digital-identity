import {
  AfterViewInit,
  Component,
  isDevMode,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { InformationPopUpComponent } from '../../../shared/pop-up/information-pop-up/information-pop-up.component';
import { BackendHttpService } from '../../../services/backend-http-service/backend-http-service.service';

export interface CredDef {
  name: string;
  comment: string;
  imageUri: string;
  schemaId: string;
  image: File | null;
  revocable: boolean;
}

export interface attributeType {
  name: string;
  type: 'string' | 'date' | 'number';
}

export interface schemaDataType {
  id: string;
  imageUri: string;
  alias: string;
  version: string;
  attributes: attributeType[];
  active: 'archived' | 'active';
}

@Component({
  selector: 'app-create-cred-def',
  templateUrl: './create-cred-def.component.html',
  styleUrls: ['./create-cred-def.component.css'],
})
export class CreateCredDefComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  schemaCtrl: FormControl = new FormControl();
  schemaFilterCtrl: FormControl = new FormControl();

  schemaData: schemaDataType[] = [];
  dataLoaded: boolean = false;

  clicked: boolean = false;

  public filteredSchemas: ReplaySubject<schemaDataType[]> = new ReplaySubject<
    schemaDataType[]
  >(1);
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  _onDestroy = new Subject<void>();

  credDefFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    iconUrl: new FormControl(''),
    schemaId: new FormControl(''),
    revocable: new FormControl(false),
  });

  credDefTmp: CredDef = {
    name: '',
    comment: '',
    imageUri: '',
    schemaId: '',
    image: null,
    revocable: false,
  };
  credDef: CredDef = {
    name: '',
    comment: '',
    imageUri: '',
    schemaId: '',
    image: null,
    revocable: false,
  };
  error = '';
  fileName = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router,
    private httpService: BackendHttpService
  ) {}

  ngOnInit(): void {
    this.getSchema();
    this.schemaCtrl.setValue(this.schemaData[this.schemaData.length]);

    // load the initial credDef list
    this.filteredSchemas.next(this.schemaData.slice());

    // listen for search field value changes
    this.schemaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtered_Schemas();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  setInitialValue() {
    this.filteredSchemas
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (
          a: schemaDataType,
          b: schemaDataType
        ) => a && b && a.alias === b.alias;
      });
  }

  filtered_Schemas() {
    if (!this.schemaData) {
      return;
    }
    // get the search keyword
    let search = this.schemaFilterCtrl.value;
    if (!search) {
      this.filteredSchemas.next(this.schemaData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the schemas
    this.filteredSchemas.next(
      this.schemaData.filter(
        (schemaData) => schemaData.alias.toLowerCase().indexOf(search) > -1
      )
    );
  }

  selectedSchema = '';

  onSelected(event: any): void {
    this.selectedSchema = event.value;
    this.credDef.schemaId = this.selectedSchema;
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.error = 'You must select an image';
      return;
    }

    let fileType = event.target.files[0].type;

    console.log(fileType);
    console.log(event.target.files[0]);

    if (fileType.match(/image\/*/) == null) {
      this.error = 'Only images are supported';
      return;
    }
    //will be used later
    /*this.fileName = event.target.files[0].name;

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.error = '';
      this.credDefFormGroup.controls['iconUrl'].setValue(reader.result); //the uploaded image is here
    };*/
  }

  createCredDef() {
    this.clicked = true;
    this.credDefTmp.name = this.credDefFormGroup.value['name'];
    this.credDefTmp.comment = this.credDefFormGroup.value['comment'];
    this.credDefTmp.imageUri = this.credDefFormGroup.value['imageUri'];
    this.credDefTmp.schemaId = this.credDefFormGroup.value['schemaId'];
    this.credDefTmp.image = this.credDefFormGroup.value['image'];
    this.credDefTmp.revocable = this.credDefFormGroup.value['revocable'];

    this.credDef.name = this.credDefTmp.name;
    this.credDef.comment = this.credDefTmp.comment;
    this.credDef.imageUri = this.credDefTmp.imageUri;
    this.credDef.schemaId = this.credDefTmp.schemaId;
    this.credDef.image = this.credDefTmp.image;
    this.credDef.revocable = this.credDefTmp.revocable;

    this.postCredDef();
  }

  postCredDef(): void {
    let params = this.credDefToHttpParams(this.credDef);

    this.httpService
      .postRequest(
        'create credential definition',
        '/credential-definition/create',
        this.credDef,
        params
      )
      .then((response) => {
        console.log('response', response);
        this.clicked = false;
        if (response.ok) {
          if (isDevMode()) {
            console.log('Create successful');
          }
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Credential Definition created',
              text: 'Credential definition successfully created ! ',
            },
          });
        } else {
          this.openDialog(
            'Creation of credential definition not successful!',
            'Server response: ' + response.body
          );
        }
      })
      .catch((response) => {
        //TODO remove debuging msgs
        this.clicked = false;
        if (isDevMode()) {
          console.log('error');
          console.log(response);
        }
        this.openDialog(
          'Error during creation!',
          'Server response: ' + response
        );
      });
  }

  credDefToHttpParams(credDef: CredDef): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('alias', credDef.name);
    params = params.append('comment', credDef.comment);
    params = params.append('imageUri', credDef.imageUri);
    params = params.append('schemaId', this.selectedSchema);
    // @ts-ignore
    params = params.append('image', credDef.image);
    params = params.append('revocable', credDef.revocable);

    return params;
  }

  getSchema() {
    const params = new HttpParams();
    this.httpService
      .getRequest('Get all schemas', '/schema/all', params)
      .then((response) => {
        if (response.ok) {
          this.schemaData = response.body;
          this.filteredSchemas.next(this.schemaData.slice());
        }
      })
      .catch((response) => {
        if (isDevMode()) {
          console.log('error');
          console.log(response);
        }
      });
  }

  openDialog(header: string, text: string) {
    this.dialogRef.open(InformationPopUpComponent, {
      data: {
        header: header,
        text: text,
      },
    });
  }
}
