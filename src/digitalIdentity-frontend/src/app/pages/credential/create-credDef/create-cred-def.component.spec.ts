import { HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCredDefComponent } from './create-cred-def.component';
import { By } from '@angular/platform-browser';
import { CreateSchemaPageComponent } from '../../schema/create-schema-page/create-schema-page.component';

describe('CreateCredentialDefinitionComponent', () => {
  let component: CreateCredDefComponent;
  let fixture: ComponentFixture<CreateCredDefComponent>;
  let httpService: BackendHttpService;
  let router: Router;

  let provided_router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCredDefComponent],
      imports: [
        MaterialModule,

        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: '/credential-definition/create',
            component: CreateCredDefComponent,
          },
          { path: '/credDef-overview/' },
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
    fixture = TestBed.createComponent(CreateCredDefComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(BackendHttpService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  /*beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCredDefComponent ]
    })
      .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCredDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.credDefFormGroup.valid).toBeFalsy();
  });

  it('form should be valid with name', () => {
    component.credDefFormGroup.controls['name'].setValue(
      generateRandomString(10)
    );
    expect(component.credDefFormGroup.valid).toBeTruthy();
  });

  it('Should have called init method after view init', () => {
    spyOn(component, 'setInitialValue').and.callFake(() => {});
    component.ngAfterViewInit();
    expect(component.setInitialValue).toHaveBeenCalled();
  });

  it('should detect file input change and set uploadedFile', () => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([''], 'test-file.png'));

    const inputDebugEl = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.credDefFormGroup.controls['iconUrl']).toBeTruthy();
  });

  it('file change event should arrive in handler', () => {
    const element = fixture.nativeElement;
    const input = element.querySelector('#fileInput');
    spyOn(component, 'selectFile');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectFile).toHaveBeenCalled();
  });

  it('should create data when submitted', () => {
    //expect(component.schemaData.length).toBeGreaterThan(0);
    component.credDefFormGroup.controls['name'].setValue(
      generateRandomString(10)
    );
    component.createCredDef();
    let spy = spyOn(component, 'postCredDef').and.callFake(function () {
      component.createCredDef();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should set filterdata on search', () => {
    let spy = spyOn(component, 'filtered_Schemas');
    component.schemaFilterCtrl.setValue('test');
    expect(spy).toHaveBeenCalled();
    component.schemaData = [];
    component.filtered_Schemas();
    component.schemaFilterCtrl.setValue('');
    component.filtered_Schemas();
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
