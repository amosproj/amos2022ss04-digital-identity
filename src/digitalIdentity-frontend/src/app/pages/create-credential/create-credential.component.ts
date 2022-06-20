import {AfterViewInit, Component, isDevMode, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {attribute, versionValidator} from "../schema/create-schema-page/create-schema-page.component";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {MatSelect} from "@angular/material/select";
import {InformationPopUpComponent} from "../../shared/pop-up/information-pop-up/information-pop-up.component";
import {environment} from "../../../environments/environment";

export interface Credential {
  name: string;
  comment: string;
  revocable: boolean;
  iconUrl: string;
  schemaId: number;
}

export interface Schema{
  schemaID: number;
  name: String;
  version: number;
}

export const SCHEMAS: Schema[] = [
  {schemaID: 2, name: 'Schema example 1', version: 2.0},
  {schemaID: 3, name: 'Schema example 2', version: 2.2},
]

@Component({
  selector: 'app-create-credential',
  templateUrl: './create-credential.component.html',
  styleUrls: ['./create-credential.component.css']
})
export class CreateCredentialComponent implements OnInit, AfterViewInit, OnDestroy {
  schemas: Schema[] = SCHEMAS;
  schemaCtrl: FormControl = new FormControl();
  schemaFilterCtrl: FormControl = new FormControl();
  public filteredSchemas: ReplaySubject<Schema[]> = new ReplaySubject<Schema[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  _onDestroy = new Subject<void>();

  credentialFormGroup!: FormGroup;

  credentialTmp: Credential = { name: '', comment: '', revocable: false, iconUrl: '', schemaId: 0 };
  credential: Credential = { name: '', comment: '', revocable: false, iconUrl: '', schemaId: 0 };
  error = "";
  fileName = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialog,
    private router: Router
  ) {
    this.credentialFormGroup = this.fb.group({
      name: ['', Validators.required],
      comment: [''],
      revocable: false,
      iconUrl: [''],
      schemaId: 0,
    });
  }

  ngOnInit(): void {
    this.schemaCtrl.setValue(this.schemas[2]);

    // load the initial credential list
    this.filteredSchemas.next(this.schemas.slice());

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
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Schema, b: Schema) => a && b && a.schemaID === b.schemaID;
      });
  }

  filtered_Schemas() {
    if (!this.schemas) {
      return;
    }
    // get the search keyword
    let search = this.schemaFilterCtrl.value;
    if (!search) {
      this.filteredSchemas.next(this.schemas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the schemas
    this.filteredSchemas.next(
      this.schemas.filter(schema => schema.name.toLowerCase().indexOf(search) > -1)
    );
  }

  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
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
}
