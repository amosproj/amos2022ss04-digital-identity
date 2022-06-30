import {AfterViewInit, Component, isDevMode, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {InformationPopUpComponent} from "../../shared/pop-up/information-pop-up/information-pop-up.component";
import {environment} from "../../../environments/environment";
import {BackendHttpService} from "../../services/backend-http-service/backend-http-service.service";

export interface Credential {
  name: string;
  comment: string;
  imageUri: string;
  revocable: boolean;
  schemaId: string;
  image: File | null;
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
  selector: 'app-create-credential',
  templateUrl: './create-credential.component.html',
  styleUrls: ['./create-credential.component.css']
})
export class CreateCredentialComponent implements OnInit, AfterViewInit, OnDestroy {
  schemaCtrl: FormControl = new FormControl();
  schemaFilterCtrl: FormControl = new FormControl();

  schemaData: schemaDataType[] = [];
  dataLoaded: boolean = false

  public filteredSchemas: ReplaySubject<schemaDataType[]> = new ReplaySubject<schemaDataType[]>(1);
  @ViewChild('singleSelect', {static: true}) singleSelect!: MatSelect;

  _onDestroy = new Subject<void>();

  credentialFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    revocable: new FormControl(false),
    iconUrl: new FormControl(''),
    schemaId: new FormControl(''),
  });

  credentialTmp: Credential = {name: '', comment: '', imageUri: '', revocable: false, schemaId: '', image: null};
  credential: Credential = {name: '', comment: '', imageUri: '', revocable: false, schemaId: '', image: null};
  error = "";
  fileName = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router,
    private httpService: BackendHttpService
  ) {
    //this.credentialFormGroup =
    this.getSchema();
  }

  ngOnInit(): void {
    this.schemaCtrl.setValue(this.schemaData[this.schemaData.length]);

    // load the initial credential list
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
        this.singleSelect.compareWith = (a: schemaDataType, b: schemaDataType) => a && b && a.alias === b.alias;
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
      this.schemaData.filter(schemaData => schemaData.alias.toLowerCase().indexOf(search) > -1)
    );
  }

  selectedSchema = '';

  onSelected(event: any): void {
    this.selectedSchema = event.value;
    this.credential.schemaId = this.selectedSchema;
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
      this.error = "Only images are supported";
      return;
    }

    this.fileName = event.target.files[0].name;

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.error = "";
      this.credentialFormGroup.controls['iconUrl'].setValue(reader.result); //the uploaded image is here
    }
  }

  createCredentialEvent() {
    this.credentialTmp.name = this.credentialFormGroup.value['name'];
    this.credentialTmp.comment = this.credentialFormGroup.value['comment'];
    this.credentialTmp.imageUri = this.credentialFormGroup.value['imageUri'];
    this.credentialTmp.revocable = this.credentialFormGroup.value['revocable'];
    this.credentialTmp.schemaId = this.credentialFormGroup.value['schemaId'];
    this.credentialTmp.image = this.credentialFormGroup.value['image'];

    this.credential.name = this.credentialTmp.name;
    this.credential.comment = this.credentialTmp.comment;
    this.credential.imageUri = this.credentialTmp.imageUri;
    this.credential.revocable = this.credentialTmp.revocable;
    this.credential.schemaId = this.credentialTmp.schemaId;
    this.credential.image = this.credentialTmp.image;

    this.postCredential();
  }

  postCredential(): void {
    let params = this.credentialToHttpParams(this.credential);

    this.httpService
      .postRequest(
        'create credential definition',
        '/credential-definition/create',
        this.credential,
        params)
      .then((response) => {
        console.log('response', response);
        if (response.ok) {
          if (isDevMode()) {
            console.log('Create successful');
          }
          this.dialogRef.open(InformationPopUpComponent, {
            data: {
              header: 'Credential Definition created',
              text: 'Credential definition successful created ! '
            },
          });
        } else {
          this.openDialog(
            'Creation not successful!',
            'Server response: ' + response.body
          );
        }
      })
      .catch((response) => {
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

  credentialToHttpParams(credential: Credential): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('alias', credential.name);
    params = params.append('comment', credential.comment);
    params = params.append('imageUri', credential.imageUri);
    params = params.append('revocable', credential.revocable);
    params = params.append('schemaId', this.selectedSchema);
    // @ts-ignore
    params = params.append('image', credential.image);

    return params;
  }

  getSchema() {
    const params = new HttpParams().append('authorization', 'passing');
    this.httpService.getRequest("Get all schemas", "/schema/all", params)
      .then(
        response => {
          if (response.ok) {
            this.schemaData = response.body
            this.filteredSchemas.next(this.schemaData.slice());
          }
        }
      )
      .catch(response => {
        console.log("error");
        console.log(response)
      })
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
