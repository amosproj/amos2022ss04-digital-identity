import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CreateProofTemplatePageComponent } from './create-proofTemplate-page.component';

describe('CreateProofTemplatePageComponent', () => {
  let component: CreateProofTemplatePageComponent;
  let fixture: ComponentFixture<CreateProofTemplatePageComponent>;
  let fb: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProofTemplatePageComponent],
      providers: [{ provide: FormBuilder, useValue: {} }],
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
