import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredDefDetailPopUpComponent, credential } from './cred-def-detail-pop-up.component';

import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../material/material.module';
import { InjectionToken } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CredDefDetailPopUpComponent', () => {
  let component: CredDefDetailPopUpComponent;
  let fixture: ComponentFixture<CredDefDetailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredDefDetailPopUpComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {
            credDef: testCredDef,
        } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.credDef = testCredDef;
    expect(component).toBeTruthy();
  });

  it('should init table properly when HttpService sends data', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
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
    await component.requestCredentials();
    expect(component.credentialsLoading).toBeFalse();
    expect(component.credentialData).not.toBe([]);
  });

  it('should not be initialized when HttpService returns error', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          reject(
            new HttpResponse({
              body: 'Error',
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 500,
              statusText: 'Internal Server Error',
              url: '',
            })
          );
        });
      }
    );
    await component.requestCredentials();
    expect(component.credentialsLoading).toBeTrue();
    expect(component.credentialData).toEqual([]);
  });

  it('should be empty when valid http call returns empty array', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: [],
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
    await component.requestCredentials();
    expect(component.credentialsLoading).toBeFalse();
    expect(component.credentialData).toBeUndefined();
  });


  it('should load attributes of single credential correctly', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: testSingleCredentialData,
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
    component.credentialData = testDataCredential;
    await component.requestAttributes(2);
    expect(component.credentialData[2].attributes).toEqual(testSingleCredentialData.attributes);
  });

  it('should let the attributes empty, when HttpService returns error', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          reject(
            new HttpResponse({
              body: 'Error',
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 500,
              statusText: 'Internal Server Error',
              url: '',
            })
          );
        });
      }
    );
    component.credentialData = testDataCredential;
    await component.requestAttributes(2);
    expect(component.credentialData[2].attributes).toEqual([]);
  });





  let testDataCredential: credential[] = [
    {
      id: "905e268f-1b89-4b6b-a11d-0eec50e3f079",
      connectionAlias: "mo2106",
      referenceName: "aaaaa",
      state: "RESPONDED",
      updatedAt: "2022-07-10T14:17:50.316884Z",
      attributes: [],
    },
    {
      id: "905e268f-1b89-4b7b-a11d-0eec50e3f079",
      connectionAlias: "mo2106",
      referenceName: "aaaaa",
      state: "INVITED",
      updatedAt: "2022-07-10T14:17:50.316884Z",
      attributes: [],
    },
    {
      id: "905e268f-1b84-4b6b-a11d-0eec50e3f079",
      connectionAlias: "mo2106",
      referenceName: "aaaaa",
      state: "RESPONDED",
      updatedAt: "2022-07-10T14:17:50.316884Z",
      attributes: [],
    },
    {
      id: "905e268f-1b89-4b6b-a11d-1eec50e3f079",
      connectionAlias: "mo2106",
      referenceName: "aaaaa",
      state: "COMPLETED",
      updatedAt: "2022-07-10T14:17:50.316884Z",
      attributes: [],
    },
    {
      id: "8f147c33-ccad-472f-91bf-080a9905aff0",
      connectionAlias: "mo2106",
      referenceName: "aaaaa",
      state: "RESPONDED",
      updatedAt: "2022-07-10T14:17:50.316884Z",
      attributes: [],
    }
  ]


  let testData = [
    {
      "connectionId": "64638d7e-95d0-4f03-b73e-ba588f518edf",
      "createdAt": "2022-07-10T14:17:50.316884Z",
      "updatedAt": "2022-07-10T14:17:50.316884Z",
      "state": "INVITED",
      "theirRole": "INVITEE",
      "myLabel": "not supported yet",
      "alias": "heri-bert@heribert.alpaka.edu",
      "accept": "auto",
      "id": "2b78b4cf-d069-47e8-996d-248d51443772"
    },
    {
      "connectionId": "a47f2f83-5aba-4dd9-a539-ee21907238ff",
      "createdAt": "2022-07-10T13:17:22.071973Z",
      "updatedAt": "2022-07-10T13:18:19.989195Z",
      "state": "RESPONDED",
      "theirRole": "INVITEE",
      "myDid": "MNLtf9LPnRXF1nKFFTc8we",
      "theirDid": "Scn75SPTzoCvDaPyubZMSa",
      "myLabel": "not supported yet",
      "theirLabel": "lissi",
      "alias": "annika.krause@fau.de",
      "accept": "auto",
      "id": "2b78b4cf-d069-47e8-996d-248d51443772"
    },
    {
      "connectionId": "2dbdbe0f-60fd-4cb1-976e-660f4f1d0f43",
      "createdAt": "2022-07-06T12:25:13.117548Z",
      "updatedAt": "2022-07-06T12:26:52.195724Z",
      "state": "COMPLETED",
      "theirRole": "INVITEE",
      "myDid": "9bRQwFx7xot7m85SEfN7H8",
      "theirDid": "SGBiHp4V48TJQ4jhRc96HZ",
      "myLabel": "not supported yet",
      "theirLabel": "lissi",
      "alias": "Karol 2",
      "accept": "auto",
      "id": "2b78b4cf-d069-47e8-996d-248d51443772"
    },
    {
      "connectionId": "6ab231cb-1672-41f1-98c9-5e36d64a1cb6",
      "createdAt": "2022-07-05T15:46:38.514162Z",
      "updatedAt": "2022-07-05T15:49:38.249365Z",
      "state": "COMPLETED",
      "theirRole": "INVITEE",
      "myDid": "XxwQDaosbKmRm8wGgvpJs",
      "theirDid": "KCewCbz1i3BfpXsLyFb7Qz",
      "myLabel": "not supported yet",
      "theirLabel": "lissi",
      "alias": "jean.frederic.vogelbacher@gmail.com",
      "accept": "auto",
      "id": "2b78b4cf-d069-47e8-996d-248d51443772"
    },
    {
      "connectionId": "e2bbadd2-c29d-4e7b-a032-dcd780ecb036",
      "createdAt": "2022-07-05T11:29:06.193028Z",
      "updatedAt": "2022-07-05T11:29:06.193028Z",
      "state": "INVITED",
      "theirRole": "INVITEE",
      "myLabel": "not supported yet",
      "alias": "test@org.de",
      "accept": "auto",
      "id": "2b78b4cf-d069-47e8-996d-248d51443772"
    },
  ];

  let testCredDef = {
    "id": "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys",
    "alias": "Mitarbeiter Ausweis Adorsys",
    "comment": "",
    "imageUri": "http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter%20Ausweis%20Adorsys",
    "schemaId": "GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00",
    "active": true,
    "revocable": true,
    "version": "1.0",
    "imported": false
  };

  let testSingleCredentialData = {
    "attributes": [
      {
        "name": "Name",
        "value": "adf"
      },
      {
        "name": "Wohnort",
        "value": "1234789"
      }
    ],
    "issuance": {
      "connectionAlias": "mo2106",
      "connectionId": "8f147c33-ccad-472f-91bf-080a9905aff0",
      "connectionTheirLabel": "lissi",
      "createdAt": "2022-07-05T17:43:55.111496Z",
      "credDefActive": true,
      "credDefAlias": "Mitarbeiter Ausweis Adorsys",
      "credDefId": "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys",
      "credDefImageUri": "http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter%20Ausweis%20Adorsys",
      "id": "2b78b4cf-d069-47e8-996d-248d51443772",
      "schemaId": "GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00",
      "state": "CREDENTIAL_ISSUED",
      "updatedAt": "2022-07-05T17:44:27.551571Z"
    }
  }
});
