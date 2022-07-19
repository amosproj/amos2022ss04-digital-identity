import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ProofActivitiesComponent } from './proof-activities.component';

describe('ProofActivitiesComponent', () => {
  let component: ProofActivitiesComponent;
  let fixture: ComponentFixture<ProofActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProofActivitiesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofActivitiesComponent);
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
    content: [
      {
        connectionAlias: 'John 20220620',
        connectionId: '2fadafc4-dea5-427c-bc5e-0d3f5c567be7',
        connectionImageUri: null,
        connectionLabel: 'lissi',
        id: 'eb5f71e4-7c1f-4e53-9214-cde694332241',
        referenceId: 'b69c1a90-2f0b-43d2-8ef9-816f7f9de31d',
        referenceImageUrl:
          'http://onboardingad.ddns.net/ctrl/images/download/3e44865e-d130-472e-b3f4-e5d53c0f9018',
        referenceName: 'John',
        referenceState: 'REQUEST_SENT',
        referenceType: 'PROOF_TEMPLATE',
        referenceTypeId: '3e44865e-d130-472e-b3f4-e5d53c0f9018',
        timestamp: '2022-07-05T16:11:19.535124Z',
      },
      {
        connectionAlias: 'John@fau.de',
        connectionId: '1df8c9bb-dbc5-4f93-871d-f60e23f85be9',
        connectionImageUri: null,
        connectionLabel: 'lissi',
        id: 'd00de45e-e5b1-4d88-af87-d6b1fd901ddb',
        referenceId: '41dd5694-750f-49c4-84cf-a16e10ae806b',
        referenceImageUrl:
          'http://onboardingad.ddns.net/ctrl/images/download/3e44865e-d130-472e-b3f4-e5d53c0f9018',
        referenceName: 'John',
        referenceState: 'REQUEST_SENT',
        referenceType: 'PROOF_TEMPLATE',
        referenceTypeId: '3e44865e-d130-472e-b3f4-e5d53c0f9018',
        timestamp: '2022-07-05T16:11:15.556426Z',
      },
      {
        connectionAlias: 'John',
        connectionId: '8f147c33-ccad-472f-91bf-080a9905aff0',
        connectionImageUri: null,
        connectionLabel: 'lissi',
        id: '66694d80-c957-4758-9f2b-8e9e3c20085c',
        referenceId: 'a29c81aa-c927-4fe1-b71d-8adae0bbab71',
        referenceImageUrl:
          'http://onboardingad.ddns.net/ctrl/images/download/3e44865e-d130-472e-b3f4-e5d53c0f9018',
        referenceName: 'John',
        referenceState: 'REQUEST_SENT',
        referenceType: 'PROOF_TEMPLATE',
        referenceTypeId: '3e44865e-d130-472e-b3f4-e5d53c0f9018',
        timestamp: '2022-07-05T16:11:11.598175Z',
      },
    ],
    number: 0,
    size: 5,
    totalElements: 3,
    totalPages: 1,
  };
});
