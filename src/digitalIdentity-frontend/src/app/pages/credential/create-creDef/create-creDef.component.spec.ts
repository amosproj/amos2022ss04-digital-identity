import {HttpParams, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from 'src/app/components/material/material.module';
import {BackendHttpService} from 'src/app/services/backend-http-service/backend-http-service.service';

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateCreDefComponent} from './create-creDef.component';
import {By} from "@angular/platform-browser";
import {CreateSchemaPageComponent} from "../../schema/create-schema-page/create-schema-page.component";

describe('CreateCredentialComponent', () => {
  let component: CreateCreDefComponent;
  let fixture: ComponentFixture<CreateCreDefComponent>;
  let httpService: BackendHttpService;
  let router: Router;

  let provided_router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCreDefComponent],
      imports: [
        MaterialModule,

        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: '/credential-definition/create', component: CreateCreDefComponent},
          {path: '/credDef-overview/'},
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
    fixture = TestBed.createComponent(CreateCreDefComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(BackendHttpService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  /*beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCreDefComponent ]
    })
      .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function generateRandomString(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
