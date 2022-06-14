import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { CreateSchemaPageComponent } from './create-schema-page.component';

describe('CreateSchemaPageComponent', () => {
  let component: CreateSchemaPageComponent;
  let fixture: ComponentFixture<CreateSchemaPageComponent>;
  let fb: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSchemaPageComponent],
      providers: [{ provide: FormBuilder, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fb = new FormBuilder();
    fixture = TestBed.createComponent(CreateSchemaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
