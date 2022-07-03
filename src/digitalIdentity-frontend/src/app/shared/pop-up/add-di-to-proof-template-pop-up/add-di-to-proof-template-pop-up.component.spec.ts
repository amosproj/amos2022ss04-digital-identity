import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/components/material/material.module';

import { AddDIToProofTemplatePopUpComponent } from './add-di-to-proof-template-pop-up.component';

describe('AddDIToProofTemplatePopUpComponent', () => {
  let component: AddDIToProofTemplatePopUpComponent;
  let fixture: ComponentFixture<AddDIToProofTemplatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDIToProofTemplatePopUpComponent],
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
    fixture = TestBed.createComponent(AddDIToProofTemplatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
