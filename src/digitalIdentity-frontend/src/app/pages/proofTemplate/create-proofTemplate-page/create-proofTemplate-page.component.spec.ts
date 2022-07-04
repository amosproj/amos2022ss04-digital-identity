import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProofTemplatePageComponent } from './create-proofTemplate-page.component';

describe('CreateProofTemplatePageComponent', () => {
  let component: CreateProofTemplatePageComponent;
  let fixture: ComponentFixture<CreateProofTemplatePageComponent>;
  let fb: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProofTemplatePageComponent],
      imports: [BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,],
      providers: [
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fb = new FormBuilder();
    fixture = TestBed.createComponent(CreateProofTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
