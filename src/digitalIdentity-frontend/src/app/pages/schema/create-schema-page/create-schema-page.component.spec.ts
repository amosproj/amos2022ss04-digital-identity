import { HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import { CreateSchemaPageComponent } from './create-schema-page.component';

describe('CreateSchemaPageComponent', () => {
  let component: CreateSchemaPageComponent;
  let fixture: ComponentFixture<CreateSchemaPageComponent>;
  let httpService: BackendHttpService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSchemaPageComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: Router, useValue: {} },
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
        return new Promise((resolve, reject) => {
          let response: HttpResponse<any> = new HttpResponse({ status: 201 });
          resolve(response);
        });
      }
    );

    // TODO: add data to this.schema
    component.postSchema();

    // -- when --

    expect(spy).toHaveBeenCalled();
  });

  //TODO:
  it('should reroute to schema/overview on after a successful post', () => {});

  //TODO:
  it('should show popup on error');
});
