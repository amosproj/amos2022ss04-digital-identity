import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CredDefActivitiesComponent } from './cred-def-activities.component';

describe('CredDefActivitiesComponent', () => {
  let component: CredDefActivitiesComponent;
  let fixture: ComponentFixture<CredDefActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredDefActivitiesComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
      ],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init properly when HttpService sends data', async () => {
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
    await component.requestActivities();
    expect(component.activitiesLoading).toBeFalse();
    expect(component.activitiyData).toEqual(testData.content);
    expect(component.length).toEqual(testData.totalElements);
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
    await component.requestActivities();
    expect(component.activitiesLoading).toBeFalse();
    expect(component.activitiyData).toEqual([]);
    expect(component.length).toEqual(0);
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
    await component.requestActivities();
    expect(component.activitiesLoading).toBeFalse();
    expect(component.activitiyData).toEqual([]);
    expect(component.length).toEqual(0);
  });



  let testData = {
    "content": [
      {
        "connectionAlias": "steve.pegouen@fau.de",
        "connectionId": "c1ea989e-fe1d-416f-95b8-6da229aa0be8",
        "connectionLabel": "lissi",
        "id": "c0a6e3af-c706-41f8-9cd5-431cdfa04f9f",
        "referenceId": "5fa08a1a-8d1d-4cb1-9361-35d6bd575ec2",
        "referenceImageUrl": "",
        "referenceName": "Mitarbeiter Ausweis Adorsys",
        "referenceState": "CREDENTIAL_ISSUED",
        "referenceType": "CREDENTIAL_DEFINITION",
        "referenceTypeId": "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys",
        "timestamp": "2022-07-11T11:47:39.334910Z"
      },
      {
        "connectionAlias": "steve.pegouen@fau.de",
        "connectionId": "c1ea989e-fe1d-416f-95b8-6da229aa0be8",
        "connectionLabel": "lissi",
        "id": "873a0de7-6393-40da-a063-ce6cb6e67785",
        "referenceId": "5fa08a1a-8d1d-4cb1-9361-35d6bd575ec2",
        "referenceImageUrl": "",
        "referenceName": "Mitarbeiter Ausweis Adorsys",
        "referenceState": "CREDENTIAL_OFFER_SENT",
        "referenceType": "CREDENTIAL_DEFINITION",
        "referenceTypeId": "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys",
        "timestamp": "2022-07-11T11:47:25.870699Z"
      },
      {
        "connectionAlias": "mo2106",
        "connectionId": "8f147c33-ccad-472f-91bf-080a9905aff0",
        "connectionLabel": "lissi",
        "id": "7b8365cd-d2b8-41a7-9b69-06065465a882",
        "referenceId": "2b78b4cf-d069-47e8-996d-248d51443772",
        "referenceImageUrl": "",
        "referenceName": "Mitarbeiter Ausweis Adorsys",
        "referenceState": "CREDENTIAL_ISSUED",
        "referenceType": "CREDENTIAL_DEFINITION",
        "referenceTypeId": "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys",
        "timestamp": "2022-07-05T17:44:27.599966Z"
      },
      {
        "connectionAlias": "mo2106",
        "connectionId": "8f147c33-ccad-472f-91bf-080a9905aff0",
        "connectionLabel": "lissi",
        "id": "41c7164c-2726-48e6-bb61-d0d4b1d279e8",
        "referenceId": "2b78b4cf-d069-47e8-996d-248d51443772",
        "referenceImageUrl": "",
        "referenceName": "Mitarbeiter Ausweis Adorsys",
        "referenceState": "CREDENTIAL_OFFER_SENT",
        "referenceType": "CREDENTIAL_DEFINITION",
        "referenceTypeId": "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys",
        "timestamp": "2022-07-05T17:43:55.138338Z"
      },
      {
        "connectionAlias": "mo2106",
        "connectionId": "8f147c33-ccad-472f-91bf-080a9905aff0",
        "connectionLabel": "lissi",
        "id": "33bb76b3-0799-46df-8220-09e2a8e17af1",
        "referenceId": "376357c7-bd3e-4150-8a05-50e8cd67b16e",
        "referenceImageUrl": "",
        "referenceName": "Mitarbeiter Ausweis Adorsys",
        "referenceState": "CREDENTIAL_OFFER_SENT",
        "referenceType": "CREDENTIAL_DEFINITION",
        "referenceTypeId": "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys",
        "timestamp": "2022-07-05T16:13:24.374690Z"
      }
    ],
    "number": 0,
    "size": 5,
    "totalElements": 69,
    "totalPages": 14
  };
});
