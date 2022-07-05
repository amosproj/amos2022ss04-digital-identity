import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import {
  CreateProofTemplatePageComponent,
  proofTemplate,
} from './create-proofTemplate-page.component';

describe('CreateProofTemplatePageComponent', () => {
  let component: CreateProofTemplatePageComponent;
  let fixture: ComponentFixture<CreateProofTemplatePageComponent>;
  let httpService: BackendHttpService;
  let fb: FormBuilder;

  let provided_router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProofTemplatePageComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule.withRoutes([
          {
            path: '/proofTemplate/create',
            component: CreateProofTemplatePageComponent,
          },
          { path: '/proofTemplate-overview/' },
        ]),
      ],
      providers: [
        {
          provide: Router,
          useValue: provided_router,
        },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fb = new FormBuilder();
    fixture = TestBed.createComponent(CreateProofTemplatePageComponent);
    httpService = TestBed.inject(BackendHttpService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO:
  it('should send a post request to the backend', () => {
    // -- given --
    // mock httpService post Request => returns HttpResponse.created
    var spy = spyOn(httpService, 'postRequest').and.callFake(
      (processName: string, path: string, data: any, params: HttpParams) => {
        expect(processName).toEqual('create proof template');
        expect(path).toEqual('/proof-template/create');

        let expected_queries = [
          'authorization',
          'alias',
          'version',
          'attributes',
        ];
        for (let query in expected_queries) {
          expect(params.get(query)).toBeDefined();
        }
        return new Promise((resolve, reject) => {
          let response: HttpResponse<any> = new HttpResponse({ status: 201 });
          resolve(response);
        });
      }
    );

    component.proofTemplate = dummy;

    component.postProofTemplate(new HttpParams());

    // -- when --

    expect(spy).toHaveBeenCalled();
  });

  //TODO:
  it('should reroute to proofTemplate/overview on after a successful post', fakeAsync(() => {
    // -- given --
    // mock httpService post Request => returns HttpResponse.created
    spyOn(httpService, 'postRequest').and.callFake(() => {
      return new Promise((resolve, reject) => {
        let response: HttpResponse<any> = new HttpResponse({ status: 201 });
        resolve(response);
      });
    });

    component.proofTemplate = dummy;

    // -- when --
    component.postProofTemplate(new HttpParams());

    tick(500);

    // -- then --
    expect(provided_router.navigate).toHaveBeenCalledWith([
      '/proofTemplate-overview',
    ]);
  }));

  //TODO:
  it('should show popup on 404 response', fakeAsync(() => {
    // -- given --
    var spy = spyOn(component.dialogRef, 'open');

    // mock httpService post Request => returns HttpResponse.created
    spyOn(httpService, 'postRequest').and.callFake(() => {
      return new Promise((resolve, reject) => {
        let response: HttpResponse<any> = new HttpResponse({ status: 404 });
        resolve(response);
      });
    });

    // -- when --
    component.postProofTemplate(new HttpParams());

    tick(500);
    // -- then --
    expect(spy).toHaveBeenCalled();
  }));

  it('should show popup on promise.reject', fakeAsync(() => {
    // -- given --
    var spy = spyOn(component.dialogRef, 'open');

    // mock httpService post Request => returns HttpResponse.created
    spyOn(httpService, 'postRequest').and.callFake(() => {
      return new Promise((resolve, reject) => {
        let response: HttpResponse<any> = new HttpResponse({ status: 404 });
        reject(response);
      });
    });

    // -- when --
    component.postProofTemplate(new HttpParams());

    tick(500);

    // -- then --
    expect(spy).toHaveBeenCalled();
  }));

  it('should create attribute and predicate string right', async () => {
    component.additionalData = [
      {
        Name: {
          selected: true,
          filter: 'no filter',
          value: 0,
        },
        Wohnort: {
          selected: true,
          filter: 'greater than',
          value: 3,
        },
      },
      {
        Name: {
          selected: false,
          filter: 'no filter',
          value: 0,
        },
        Wohnort: {
          selected: true,
          filter: 'greater than',
          value: 3,
        },
      },
    ];
    component.schemaData = schemas;
    component.credDefData = credDefs;
    component.matchSchemaAttributesToCredDefs();
    expect(component.schemaDataAttributes).toEqual([
      {
        alias: 'Mitarbeiter Ausweis',
        attributes: ['Name', 'Wohnort'],
        schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00',
      },
      {
        alias: 'Mitarbeiter Ausweis',
        attributes: ['Name', 'Wohnort'],
        schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00',
      },
      {
        alias: 'Fuehrerschein',
        attributes: ['nachname', 'typ', 'identifier', 'vorname'],
        schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Fuehrerschein:1.00',
      },
    ]);
    component.selection = selection;
    component.selectionChanged();
    expect(component.proofTemplate.credDefStringAttributes).toEqual(
      JSON.stringify({
        'GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys': {
          attributeNames: [{ attributeName: 'Name' }],
        },
      })
    );
    expect(component.proofTemplate.credDefStringPredicates).toEqual(
      JSON.stringify({
        'GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys': [
          { predicateName: 'Wohnort', predicateType: '>', predicateValue: 3 },
        ],
        'GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Dauerhaft': [
          { predicateName: 'Wohnort', predicateType: '>', predicateValue: 3 },
        ],
      })
    );
  });

  it('should add and delete attributes to/from the requested attributes and switch type', async () => {
    let formArray = component.attributes;

    expect(formArray.length).toBe(0);

    component.addAttribute();
    expect(formArray.length).toBe(1);
    expect(component.attributes.controls[0].value.attributeType).toEqual(
      'String'
    );
    component.proofTemplateFormGroup.value['attributes'][0]['attributeType'] =
      'Number';
    component.switchAttributeValue(0);
    expect(component.attributes.controls[0].value.attributeType).toEqual(
      'Number'
    );

    component.addAttribute();
    expect(formArray.length).toBe(2);
    expect(component.attributes.controls[1].value.attributeType).toEqual(
      'String'
    );
    component.proofTemplateFormGroup.value['attributes'][0]['attributeType'] =
      'Email';
    component.switchAttributeValue(1);
    expect(component.attributes.controls[0].value.attributeType).toEqual(
      'Email'
    );

    component.deleteAttribute(0);
    expect(formArray.length).toBe(1);
  });
});

const selection: any[] = [
  {
    active: true,
    alias: 'Mitarbeiter Ausweis Adorsys',
    comment: '',
    id: 'GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys',
    imageUri:
      'http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter%20Ausweis%20Adorsys',
    imported: false,
    revocable: true,
    schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00',
    version: '1.0',
  },
  {
    active: true,
    alias: 'Mitarbeiter Ausweis Dauerhaft',
    comment: 'Not revocable',
    id: 'GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Dauerhaft',
    imageUri:
      'http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter%20Ausweis%20Dauerhaft',
    imported: false,
    revocable: true,
    schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00',
    version: '1.0',
  },
];

const schemas: any[] = [
  {
    active: true,
    alias: 'Mitarbeiter Ausweis',
    attributes: ['Name', 'Wohnort'],
    id: 'GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00',
    imageUri:
      'http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter%20Ausweis:1.00',
    version: '1.00',
  },
  {
    active: false,
    alias: 'Fuehrerschein',
    attributes: ['nachname', 'typ', 'identifier', 'vorname'],
    id: 'GCevMyEWCa5Fd58gfzkASy:2:Fuehrerschein:1.00',
    imageUri:
      'http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:2:Fuehrerschein:1.00',
    version: '1.00',
  },
];

const credDefs: any[] = [
  {
    active: true,
    alias: 'Mitarbeiter Ausweis Adorsys',
    comment: '',
    id: 'GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys',
    imageUri:
      'http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter%20Ausweis%20Adorsys',
    imported: false,
    revocable: true,
    schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00',
    version: '1.0',
  },
  {
    active: true,
    alias: 'Mitarbeiter Ausweis Dauerhaft',
    comment: 'Not revocable',
    id: 'GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Dauerhaft',
    imageUri:
      'http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter%20Ausweis%20Dauerhaft',
    imported: false,
    revocable: true,
    schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00',
    version: '1.0',
  },
  {
    active: true,
    alias: 'Adorys Fuehrerschein',
    comment: '',
    id: 'GCevMyEWCa5Fd58gfzkASy:3:CL:8794:Adorys Fuehrerschein',
    imageUri:
      'http://onboardingad.ddns.net/ctrl/images/download/GCevMyEWCa5Fd58gfzkASy:3:CL:8794:Adorys%20Fuehrerschein',
    imported: false,
    revocable: false,
    schemaId: 'GCevMyEWCa5Fd58gfzkASy:2:Fuehrerschein:1.00',
    version: '1.0',
  },
];

const dummy: proofTemplate = {
  image: null,
  name: 'name',
  version: 'version',
  attributes: [
    {
      name: 'attr1',
    },
    {
      name: 'attr2',
    },
  ],
  credDefs: [[{}, {}], [{}]],
  credDefStringAttributes: '',
  credDefStringPredicates: '',
};
