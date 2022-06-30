import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/components/material/material.module';

import { AddDIToCredentialPopUpComponent } from './add-dito-credential-pop-up.component';

describe('AddDIToCredentialPopUpComponent', () => {
  let component: AddDIToCredentialPopUpComponent;
  let fixture: ComponentFixture<AddDIToCredentialPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDIToCredentialPopUpComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDIToCredentialPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
