import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreDefComponent } from './create-creDef.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../components/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BackendHttpService } from '../../../services/backend-http-service/backend-http-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { LoginPageComponent } from '../../login-page/login-page.component';

describe('CreateCredentialComponent', () => {
  let component: CreateCreDefComponent;
  let fixture: ComponentFixture<CreateCreDefComponent>;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCreDefComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpClient],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CreateCreDefComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
      });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreDefComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*
  it('form invalid when empty', () => {
    expect(component.credentialFormGroup.valid).toBeFalsy();
  });

  it('form should be valid with name', () => {
    component.credentialFormGroup.controls['name'].setValue(generateRandomString(10));
    expect(component.credentialFormGroup.valid).toBeTruthy();
  });

  it('should call initializer function in constructor', () => {
    spyOn(component, 'getSchema').and.callFake(() => {});
    TestBed.createComponent(CreateCreDefComponent);
    expect(component.getSchema).toHaveBeenCalled();
  });

  it('Should have called init method after view init', () => {
    spyOn(component, 'setInitialValue').and.callFake(() => {});
    component.ngAfterViewInit();
    expect(component.setInitialValue).toHaveBeenCalled();
  });
  it('should detect file input change and set uploadedFile', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'))

    const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.credentialFormGroup.controls['iconUrl']).toBeTruthy();
    expect(component.credentialFormGroup.controls['iconUrl']).toBeInstanceOf(String);

  });

  it('file change event should arrive in handler', () => {
    const element = fixture.nativeElement;
    const input = element.querySelector('#file');
    spyOn(component, 'selectFile');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectFile).toHaveBeenCalled();
  });

  it('should create data when submitted', () => {
    //expect(component.schemaData.length).toBeGreaterThan(0);
    component.credentialFormGroup.controls['name'].setValue(generateRandomString(10));

    let spy = spyOn(component, 'postCredential').and.callFake(function() {
      component.createCredential();
      expect(spy).toHaveBeenCalled();
    });
  });
*/
});
function generateRandomString(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
