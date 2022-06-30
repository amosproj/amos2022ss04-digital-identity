import {AfterViewInit, Component, isDevMode, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {InformationPopUpComponent} from "../../../shared/pop-up/information-pop-up/information-pop-up.component";
import {BackendHttpService} from "../../../services/backend-http-service/backend-http-service.service";

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
  selector: 'app-create-creDef',
  templateUrl: './create-creDef.component.html',
  styleUrls: ['./create-creDef.component.css']
})
export class CreateCreDefComponent implements OnInit, AfterViewInit, OnDestroy {
  schemaCtrl: FormControl = new FormControl();
  schemaFilterCtrl: FormControl = new FormControl();

  schemaData: schemaDataType[] = [];
  dataLoaded: boolean = false

  public filteredSchemas: ReplaySubject<schemaDataType[]> = new ReplaySubject<schemaDataType[]>(1);
  @ViewChild('singleSelect', {static: true}) singleSelect!: MatSelect;

  _onDestroy = new Subject<void>();

  creDefFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    revocable: new FormControl(false),
    iconUrl: new FormControl(''),
    schemaId: new FormControl(''),
  });

  creDefTmp: Credential = {name: '', comment: '', imageUri: '', revocable: false, schemaId: '', image: null};
  creDef: Credential = {name: '', comment: '', imageUri: '', revocable: false, schemaId: '', image: null};
  error = "";
  fileName = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router,
    private httpService: BackendHttpService
  ) {
    //this.creDefFormGroup =
    this.getSchema();
  }

  ngOnInit(): void {
    this.schemaCtrl.setValue(this.schemaData[this.schemaData.length]);

    // load the initial creDef list
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
    this.creDef.schemaId = this.selectedSchema;
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
      this.creDefFormGroup.controls['iconUrl'].setValue(reader.result); //the uploaded image is here
    }
  }

  createCreDef() {
    this.creDefTmp.name = this.creDefFormGroup.value['name'];
    this.creDefTmp.comment = this.creDefFormGroup.value['comment'];
    this.creDefTmp.imageUri = this.creDefFormGroup.value['imageUri'];
    this.creDefTmp.revocable = this.creDefFormGroup.value['revocable'];
    this.creDefTmp.schemaId = this.creDefFormGroup.value['schemaId'];
    this.creDefTmp.image = this.creDefFormGroup.value['image'];

    this.creDef.name = this.creDefTmp.name;
    this.creDef.comment = this.creDefTmp.comment;
    this.creDef.imageUri = this.creDefTmp.imageUri;
    this.creDef.revocable = this.creDefTmp.revocable;
    this.creDef.schemaId = this.creDefTmp.schemaId;
    this.creDef.image = this.creDefTmp.image;

    this.postCredential();
  }

  postCredential(): void {
    let params = this.creDefToHttpParams(this.creDef);

    this.httpService
      .postRequest(
        'create credential definition',
        '/credential-definition/create',
        this.creDef,
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

  creDefToHttpParams(creDef: Credential): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('alias', creDef.name);
    params = params.append('comment', creDef.comment);
    params = params.append('imageUri', creDef.imageUri);
    params = params.append('revocable', creDef.revocable);
    params = params.append('schemaId', this.selectedSchema);
    // @ts-ignore
    params = params.append('image', creDef.image);

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
