import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { CreateProofTemplatePageComponent, proofTemplate } from './create-proofTemplate-page.component';

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
      imports: [BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule.withRoutes([
          { path: '/proofTemplate/create', component: CreateProofTemplatePageComponent },
          { path: '/proofTemplate-overview/' },
        ]),],
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
    expect(provided_router.navigate).toHaveBeenCalledWith(['/proofTemplate-overview']);
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
});

const dummy: proofTemplate = {
  image:null,
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
  credDefs:[
    {}
  ],
  credDefStringAttributes: '',
  credDefStringPredicates: '',
};
