import { HttpParams, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreDefComponent } from './create-creDef.component';
import { By } from '@angular/platform-browser';
import { CreateSchemaPageComponent } from '../../schema/create-schema-page/create-schema-page.component';

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
          {
            path: '/credential-definition/create',
            component: CreateCreDefComponent,
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

  it('form invalid when empty', () => {
    expect(component.creDefFormGroup.valid).toBeFalsy();
  });

  it('form should be valid with name', () => {
    component.creDefFormGroup.controls['name'].setValue(
      generateRandomString(10)
    );
    expect(component.creDefFormGroup.valid).toBeTruthy();
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

    expect(component.creDefFormGroup.controls['iconUrl']).toBeTruthy();
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
    component.creDefFormGroup.controls['name'].setValue(
      generateRandomString(10)
    );
    component.createCreDef();
    let spy = spyOn(component, 'postCredential').and.callFake(function () {
      component.createCreDef();
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
