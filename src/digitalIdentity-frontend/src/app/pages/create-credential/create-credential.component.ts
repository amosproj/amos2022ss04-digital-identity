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
export class CreateCredentialComponent implements OnInit {
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

  }

}
