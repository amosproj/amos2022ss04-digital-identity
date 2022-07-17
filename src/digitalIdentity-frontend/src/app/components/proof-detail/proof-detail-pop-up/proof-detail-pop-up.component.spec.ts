import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  attribute,
  ProofDetailPopUpComponent, proofTemplate
} from './proof-detail-pop-up.component';

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
import { RouterTestingModule } from '@angular/router/testing';

describe('ProofDetailPopUpComponent', () => {
  let component: ProofDetailPopUpComponent;
  let fixture: ComponentFixture<ProofDetailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProofDetailPopUpComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            proofTemplate: testProofTemplate,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.proofTemplate = testProofTemplate;
    expect(component).toBeTruthy();
  });

  it('should filter prooftemplate', () => {
    component.proofTemplate = [];
    let event = {target:{value:"Jannik 20220620"}};
    //event.target.
    component.applyFilter(event as unknown as Event);
    expect(component.proofTemplate.length).toBeDefined();
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
    await component.requestProofTemplate();
    expect(component.proofTemplatesLoading).toBeFalse();
    expect(component.proofTemplateData).not.toBe([]);
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
    await component.requestProofTemplate();
    expect(component.proofTemplatesLoading).toBeTrue();
    expect(component.proofTemplateData).toEqual([]);
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
    await component.requestProofTemplate();
    expect(component.proofTemplatesLoading).toBeFalse();
    expect(component.proofTemplateData).toBeUndefined();
  });

  it('should load attributes of single proof correctly', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: testSingleProofTemplateData,
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
    component.proofTemplateData = testDataProofTemplate;
    await component.requestAttributes(1);
    expect(component.proofTemplateData[1].selfAttestedAttributes).toEqual(
      testSingleProofTemplateData.selfAttestedAttributes
    );
    expect(component.proofTemplateData[1].revealedAttributes).toEqual(
      testSingleProofTemplateData.revealedAttributes
    );
  });

  let testDataProofTemplate: proofTemplate[] = [
    {
      referenceName: "string",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      updatedAt: "2022-07-06T12:20:34.823916Z",
      connectionAlias: "Jannik 20220620",
      exchangeId: "564ecfb1-e3e6-4616-8eb4-012088ddb516",
      state: "REQUEST_SENT",

      selfAttestedAttributes: [
        {
          name: 'Name',
          value: 'adf',
        },
        {
          name: 'Wohnort',
          value: '1234789',
        },
      ],
      revealedAttributes: Object.entries([
        {
          "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:NotRevocable": [
            {
              "name": "Name",
              "value": "test"
            },
            {
              "name": "Wohnort",
              "value": "testtest"
            }
          ]
        }
      ]) as unknown as Map<string, attribute[]>

    },{
      referenceName: "string",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      updatedAt: "2022-07-06T12:20:34.823916Z",
      connectionAlias: "Jannik 20220620",
      exchangeId: "564ecfb1-e3e6-4616-8eb4-012088ddb516",
      state: "REQUEST_SENT",

      selfAttestedAttributes: [
        {
          name: 'Name',
          value: 'adf',
        },
        {
          name: 'Wohnort',
          value: '1234789',
        },
      ],
      revealedAttributes: Object.entries([
        {
          "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:NotRevocable": [
            {
              "name": "Name",
              "value": "test"
            },
            {
              "name": "Wohnort",
              "value": "testtest"
            }
          ]
        }
      ]) as unknown as Map<string, attribute[]>

    },{
      referenceName: "string",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      updatedAt: "2022-07-06T12:20:34.823916Z",
      connectionAlias: "Jannik 20220620",
      exchangeId: "564ecfb1-e3e6-4616-8eb4-012088ddb516",
      state: "REQUEST_SENT",

      selfAttestedAttributes: [
        {
          name: 'Name',
          value: 'adf',
        },
        {
          name: 'Wohnort',
          value: '1234789',
        },
      ],
      revealedAttributes: Object.entries([
        {
          "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:NotRevocable": [
            {
              "name": "Name",
              "value": "test"
            },
            {
              "name": "Wohnort",
              "value": "testtest"
            }
          ]
        }
      ]) as unknown as Map<string, attribute[]>

    },{
      referenceName: "string",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      updatedAt: "2022-07-06T12:20:34.823916Z",
      connectionAlias: "Jannik 20220620",
      exchangeId: "564ecfb1-e3e6-4616-8eb4-012088ddb516",
      state: "REQUEST_SENT",

      selfAttestedAttributes: [
        {
          name: 'Name',
          value: 'adf',
        },
        {
          name: 'Wohnort',
          value: '1234789',
        },
      ],
      revealedAttributes: Object.entries([
        {
          "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:NotRevocable": [
            {
              "name": "Name",
              "value": "test"
            },
            {
              "name": "Wohnort",
              "value": "testtest"
            }
          ]
        }
      ]) as unknown as Map<string, attribute[]>

    }
  ];
  
  let proofTemplateDataFull: proofTemplate[] = [
    {
      referenceName: "string",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      updatedAt: "2022-07-06T12:20:34.823916Z",
      connectionAlias: "Jannik 20220620",
      exchangeId: "564ecfb1-e3e6-4616-8eb4-012088ddb516",
      state: "REQUEST_SENT",

      selfAttestedAttributes: [
        {
          name: 'Name',
          value: 'adf',
        },
        {
          name: 'Wohnort',
          value: '1234789',
        },
      ],
      revealedAttributes: Object.entries([
        {
          "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:NotRevocable": [
            {
              "name": "Name",
              "value": "test"
            },
            {
              "name": "Wohnort",
              "value": "testtest"
            }
          ]
        }
      ]) as unknown as Map<string, attribute[]>

    },
  ];

  let testProofTemplate = 
    {
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      name: "Ausweiskontrolle",
      version: "1.00",
      active: true,
      imageUrl: "http://onboardingad.ddns.net/ctrl/images/download/c06718a9-8866-456f-99cc-8e6b504048d3",
      timestamp: "2022-04-21T07:14:52.347780Z",
      requestedAttributes: {
          "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys": {
              "attributeNames": [
                  {
                      "attributeName": "Name"
                  },
                  {
                      "attributeName": "Wohnort"
                  }
              ],
              "revocationFilterTimes": {
                  "startTime": null,
                  "endTime": 0
              },
              "revocationFilterType": null
          }
      },
      requestedPredicates: {},
      requestedSelfAttestedAttributes: [
          {
              "attributeName": "Phone"
          }
      ],
      revocationFilterTimes: null,
      revocationFilterType: "CURRENT"
  }
  

  let testSingleProofTemplateData = {
    referenceName: "string",
    templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
    updatedAt: "2022-07-06T12:20:34.823916Z",
    connectionAlias: "Jannik 20220620",
    exchangeId: "564ecfb1-e3e6-4616-8eb4-012088ddb516",
    state: "REQUEST_SENT",

    selfAttestedAttributes: [
      {
        name: 'Name',
        value: 'adf',
      },
      {
        name: 'Wohnort',
        value: '1234789',
      },
    ],
    revealedAttributes: Object.entries([
      {
        "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:NotRevocable": [
          {
            "name": "Name",
            "value": "test"
          },
          {
            "name": "Wohnort",
            "value": "testtest"
          }
        ]
      }
    ]) as unknown as Map<string, attribute[]>
  };
});


let testData = [
  {
    templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
    name: "Ausweiskontrolle",
    version: "1.00",
    active: true,
    imageUrl: "http://onboardingad.ddns.net/ctrl/images/download/c06718a9-8866-456f-99cc-8e6b504048d3",
    timestamp: "2022-04-21T07:14:52.347780Z",
    requestedAttributes: {
        "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys": {
            "attributeNames": [
                {
                    "attributeName": "Name"
                },
                {
                    "attributeName": "Wohnort"
                }
            ],
            "revocationFilterTimes": {
                "startTime": null,
                "endTime": 0
            },
            "revocationFilterType": null
        }
    },
    requestedPredicates: {},
    requestedSelfAttestedAttributes: [
        {
            "attributeName": "Phone"
        }
    ],
    revocationFilterTimes: null,
    revocationFilterType: "CURRENT"
},
{
  templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
  name: "Ausweis Kontrolle Dauerhaft",
  version: "1.00",
  active: true,
  imageUrl: "http://onboardingad.ddns.net/ctrl/images/download/c06718a9-8866-456f-99cc-8e6b504048d3",
  timestamp: "2022-04-21T07:14:52.347780Z",
  requestedAttributes: {
      "GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Dauerhaft": {
          "attributeNames": [
              {
                  "attributeName": "Name"
              },
              {
                  "attributeName": "Wohnort"
              }
          ],
          "revocationFilterTimes": {
              "startTime": null,
              "endTime": 0
          },
          "revocationFilterType": null
      }
  },
  requestedPredicates: {},
  requestedSelfAttestedAttributes: [
      {
          "attributeName": "Phone"
      }
  ],
  revocationFilterTimes: null,
  revocationFilterType: "CURRENT"
}
]