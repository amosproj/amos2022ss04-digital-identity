import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDIToCredentialPopUpComponent } from './add-dito-credential-pop-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../components/material/material.module";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AddDIToCredentialPopUpComponent', () => {
  let component: AddDIToCredentialPopUpComponent;
  let fixture: ComponentFixture<AddDIToCredentialPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDIToCredentialPopUpComponent ],
      imports:[HttpClientTestingModule,FormsModule, ReactiveFormsModule ,MatDialogModule,
        MaterialModule,BrowserAnimationsModule],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {} },{
        provide: MatDialogRef,
        useValue: {}
      },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDIToCredentialPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.attributeFormGroup.valid).toBeFalsy();
  });

  it('form should be valid with name', () => {
    component.attributeFormGroup.controls['connection'].setValue("1234567");
    expect(component.attributeFormGroup.valid).toBeTruthy();
  });

  it('should call initializer function in ngOninit', () => {

    spyOn(component, 'getDI').and.callFake(() => {
      expect(component.DIData.length).toBeGreaterThan(0);
    });
  });
  it('should create data when submitted', () => {
    //expect(component.schemaData.length).toBeGreaterThan(0);
    component.attributeFormGroup.controls['connection'].setValue('1234567');

    let spy = spyOn(component, 'save').and.callFake(async () => {});
    component.save();
    expect(spy).toHaveBeenCalled();
  });
});
