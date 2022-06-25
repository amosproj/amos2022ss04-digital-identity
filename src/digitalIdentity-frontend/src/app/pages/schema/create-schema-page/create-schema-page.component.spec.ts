import { HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import {
  CreateSchemaPageComponent,
  schema,
} from './create-schema-page.component';

describe('CreateSchemaPageComponent', () => {
  let component: CreateSchemaPageComponent;
  let fixture: ComponentFixture<CreateSchemaPageComponent>;
  let httpService: BackendHttpService;
  let router: Router;

  let provided_router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSchemaPageComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '/schema/create', component: CreateSchemaPageComponent },
          { path: '/schema-overview/' },
        ]),
      ],
      providers: [
        {
          provide: Router,
          useValue: provided_router,
        },
        // Router,
        FormBuilder,
        BackendHttpService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchemaPageComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(BackendHttpService);
    router = TestBed.inject(Router);
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
        expect(processName).toEqual('create schema');
        expect(path).toEqual('/schema/create');

        let expected_queries = [
          'athorization',
          'alias',
          'verion',
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

    component.schema = dummy;

    component.postSchema();

    // -- when --

    expect(spy).toHaveBeenCalled();
  });

  //TODO:
  it('should reroute to schema/overview on after a successful post', fakeAsync(() => {
    // -- given --
    // mock httpService post Request => returns HttpResponse.created
    spyOn(httpService, 'postRequest').and.callFake(() => {
      return new Promise((resolve, reject) => {
        let response: HttpResponse<any> = new HttpResponse({ status: 201 });
        resolve(response);
      });
    });

    component.schema = dummy;

    // -- when --
    component.postSchema();

    tick(500);

    // -- then --
    expect(provided_router.navigate).toHaveBeenCalledWith(['/schema-overview']);
  }));

  //TODO:
  it('should show popup on 404 response', fakeAsync(() => {
    // -- given --
    var spy = spyOn(component, 'openDialog');

    // mock httpService post Request => returns HttpResponse.created
    spyOn(httpService, 'postRequest').and.callFake(() => {
      return new Promise((resolve, reject) => {
        let response: HttpResponse<any> = new HttpResponse({ status: 404 });
        resolve(response);
      });
    });

    // -- when --
    component.postSchema();

    tick(500);
    // -- then --
    expect(spy).toHaveBeenCalled();
  }));

  it('should show popup on promoise.reject', fakeAsync(() => {
    // -- given --
    var spy = spyOn(component, 'openDialog');
    fixture.detectChanges();

    // mock httpService post Request => returns HttpResponse.created
    spyOn(httpService, 'postRequest').and.callFake(() => {
      return new Promise((resolve, reject) => {
        let response: HttpResponse<any> = new HttpResponse({ status: 404 });
        reject(response);
      });
    });

    // -- when --
    component.postSchema();

    tick(500);

    // -- then --
    expect(spy).toHaveBeenCalled();
  }));
});

const dummy: schema = {
  iconUrl: 'iconUrl',
  name: 'name',
  version: 'version',
  attributes: [
    {
      attribID: 1,
      name: 'att1',
      value: 'string 1',
      type: 'String',
    },
    {
      attribID: 2,
      name: 'att2',
      value: 2,
      type: 'Number',
    },
  ],
};
