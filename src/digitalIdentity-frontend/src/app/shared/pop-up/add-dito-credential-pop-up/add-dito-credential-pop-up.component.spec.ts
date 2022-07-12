import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDIToCredentialPopUpComponent } from './add-dito-credential-pop-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../components/material/material.module";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BackendHttpService} from "../../../services/backend-http-service/backend-http-service.service";

describe('AddDIToCredentialPopUpComponent', () => {
  let component: AddDIToCredentialPopUpComponent;
  let fixture: ComponentFixture<AddDIToCredentialPopUpComponent>;
  var originalTimeout = 0;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDIToCredentialPopUpComponent ],
      imports:[HttpClientTestingModule,FormsModule, ReactiveFormsModule ,MatDialogModule,
        MaterialModule,BrowserAnimationsModule],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {} },{
        provide: MatDialogRef,
        useValue: {}
      },{provide : BackendHttpService, useValue:{
            getRequest: (arg0: any, arg1: any, arg2: any) => {
              return new Promise<any>(function (resolve, reject) {
                return new HttpResponse({
                  body: testData,
                  headers: new HttpHeaders().append(
                    'Content-Type',
                    'application/json'
                  ),
                  status: 200,
                  statusText: 'OK',
                  url: '',
                });
              });
            },
          }}]
    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(AddDIToCredentialPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.attributeFormGroup.valid).toBeFalsy();
  });

  it('form should be valid with name', () => {
    component.attributeFormGroup.controls['connection'].setValue("1234567");
    expect(component.attributeFormGroup.valid).toBeTruthy();
  });
  it('should init schemas properly when HttpService sends data', async () => {
    let spyGetRequest = spyOn(component.HttpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: testData,
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 200,
              statusText: 'OK',
              url: '',
            })
          );
        });
      }
    );
    await component.getSchema();
    expect(component.getSchemaData()).not.toBe([]);
  });it('should return properly getSchemaByID', async () => {
    let spyGetRequest = spyOn(component.HttpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: testData,
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 200,
              statusText: 'OK',
              url: '',
            })
          );
        });
      }
    );
    let returnData = await component.getSchemaByID("GCevMyEWCa5Fd58gfzkASy:2:myAlias:1.0");
    expect(returnData).toBeDefined();
  });
  it('should init Dis properly when HttpService sends data', async () => {
    let spyGetRequest = spyOn(component.HttpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: testDIList,
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 200,
              statusText: 'OK',
              url: '',
            })
          );
        });
      }
    );
    await component.getDI();
    expect(component.DIData).not.toBe([]);
  });

  it('should init Dis with wrong data when HttpService sends data', async () => {
    let spyGetRequest = spyOn(component.HttpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          reject(
            new HttpErrorResponse({

              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 404,
              statusText: 'OK',
              url: '',
            })
          );
        });
      }
    );
    await component.getDI();
    expect(component.DIData).not.toBe([]);
  });
  it('should call initializer function in ngOninit',  () => {

    spyOn(component, 'getDI').and.callFake(() => {
      expect(component.DIData.length).toBeGreaterThan(0);
    });
     component.ngOnInit();
    /*expect(component.getDI).toHaveBeenCalled();*/
    expect(component.attributesData).toBeDefined();
  });
  it('should create data when submitted', () => {
    //expect(component.schemaData.length).toBeGreaterThan(0);
    component.attributeFormGroup.controls['connection'].setValue('1234567');

    let spy = spyOn(component, 'save').and.callFake(async () => {});
    component.save();
    expect(spy).toHaveBeenCalled();
  });
  it('should select Event', () => {
    //expect(component.schemaData.length).toBeGreaterThan(0);

    let spyGetSelectedDI = spyOn(component, 'getSelectedDI').and.callFake(async () => {});
    component.getSelectedDI({value:'1234567'});

    expect(spyGetSelectedDI).toHaveBeenCalled();
    expect(component.selectedId).toBeDefined();
  });

  const testDIList: any[]=  [
    {
      "connectionId": "6696d12f-c3ce-46ff-a448-ec4e338d9f8a",
      "createdAt": "2022-06-30T20:41:27.250530Z",
      "updatedAt": "2022-06-30T20:41:27.250530Z",
      "state": "INVITED",
      "theirRole": "INVITEE",
      "myLabel": "not supported yet",
      "alias": "tyr-echse@web.de",
      "accept": "auto"
    },
    {
      "connectionId": "542bfe0a-02b8-4cd0-bcae-2291e79dd240",
      "createdAt": "2022-06-29T14:30:08.639490Z",
      "updatedAt": "2022-06-29T14:30:08.639490Z",
      "state": "INVITED",
      "theirRole": "INVITEE",
      "myLabel": "not supported yet",
      "alias": "test",
      "accept": "auto"
    }
  ];

  let testData: any[] = [
    {
      alias: 'TestSchema',
      imageUri: '/djal/dhladhw/dhalw',
      version: '2.1',
      id:"GCevMyEWCa5Fd58gfzkASy:2:myAlias:1.0",
      attributes: [
        {
          name: 'test',
          type: 'string',
        },
      ],
    },
    {
      alias: 'TestSchema23',
      imageUri: '/djal/dhladhw/dhalw',
      version: '2.0',
      id:"GCevMyEWCa5Fd58gfzkASy:2:Datenblatt:1.00",
      attributes: [
        {
          name: 'test',
          type: 'number',
        },
      ],
    },
    {
      alias: 'TestSchema029',
      imageUri: '/djal/dhladhw/dhalw',
      version: '1.9',
      id:"GCevMyEWCa5Fd58gfzkASy:2:Fuehrerschein:1.00",
      attributes: [
        {
          name: 'value',
          type: 'date',
        },
      ],
    },
  ];
});
