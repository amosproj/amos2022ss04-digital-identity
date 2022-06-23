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
  revocable: boolean;
  iconUrl: string;
  schemaId: string;
}

export interface attributeType {
  name: string;
  type: 'string' | 'date' | 'number';
}

export interface schemaDataType {
  id : string;
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
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  _onDestroy = new Subject<void>();

  credentialFormGroup!: FormGroup;

  credentialTmp: Credential = { name: '', comment: '', revocable: false, iconUrl: '', schemaId: '' };
  credential: Credential = { name: '', comment: '', revocable: false, iconUrl: '', schemaId: '' };
  error = "";
  fileName = "";
  private requestInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router,
    private HttpService: BackendHttpService
  ) {
    this.credentialFormGroup = this.fb.group({
      name: ['', Validators.required],
      comment: [''],
      revocable: false,
      iconUrl: [''],
      schemaId: '',
    });
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
  onSelected(event: any):void {
    this.selectedSchema = event.value;
    this.credential.schemaId = this.selectedSchema;
  }


  createCredential(){
    this.credentialTmp.name = this.credentialFormGroup.value['name'];
    this.credentialTmp.comment = this.credentialFormGroup.value['comment'];
    this.credentialTmp.revocable = this.credentialFormGroup.value['revocable'];
    this.credentialTmp.iconUrl = this.credentialFormGroup.value['iconUrl'];
    this.credentialTmp.schemaId = this.credentialFormGroup.value['schemaId'];

    this.credential.name = this.credentialTmp.name;
    this.credential.comment = this.credentialTmp.comment;
    this.credential.revocable = this.credentialTmp.revocable;
    this.credential.iconUrl = this.credentialTmp.iconUrl;
    this.credential.schemaId = this.credentialTmp.schemaId;

    this.postCredential();
  }

  postCredential(): void {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    console.log(this.credential);

    let body = JSON.stringify(this.credential);
    let params = this.credentialToHttpParams(this.credential);

    this.createPostRequest(params);

  }
/*
  postCredential(): void {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    console.log(this.credential);

    let body = JSON.stringify(this.credential);
    let params = this.credentialToHttpParams(this.credential);

    this.http
      .post<any>(environment.serverURL + '/credential-definition/create', body, {
        headers: headers,
        observe: 'response',
        params: params,
      })
      .subscribe({
        next: (response) => {
          if (response.status == 201) {
            this.router.navigate(['/create-credential']).then(r => {});
            this.openDialog(
              'Creation successful!',
              ''
            )
          } else {
            this.openDialog(
              'Creation not successful!',
              'Server response: ' + response.body
            );

            if (isDevMode()) {
              console.log(
                'Creation not successful! Server response: ' + response.body
              );
            }
          }
        },
        error: (error) => {
          this.openDialog(
            'Creation not successful! Server response!',
            'Server response: ' + error.status + ' ' + error.message
          );
          console.log(error);
        },
      });
  }*/

  credentialToHttpParams(credential: Credential): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('alias', credential.name);
    params = params.append('comment', credential.comment);
    params = params.append('revocable', credential.revocable);
    params = params.append('schemaId', this.selectedSchema);

    return params;
  }

  openDialog(header: string, text: string) {
    this.dialogRef.open(InformationPopUpComponent, {
      data: {
        header: header,
        text: text,
      },
    });
  }

  getSchema() {
    const params = new HttpParams().append('authorization', 'passing');
    this.HttpService.getRequest("Get all schemas","/schema/all",params)
      .then(
        response => {
          if (response.ok) {
            this.schemaData = response.body
            this.filteredSchemas.next(this.schemaData.slice());
          }
        }
      )
      .catch(response => {console.log("error"); console.log(response)})
  }

  createPostRequest(params: HttpParams) {
    this.requestInProgress = true;
    this.HttpService.postRequest(
      'create credential',
      '/credential-definition/create',
      this.credential,
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
              header: 'Creating of credential was successful',
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
}
