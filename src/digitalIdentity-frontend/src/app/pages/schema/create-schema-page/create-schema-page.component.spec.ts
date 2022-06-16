import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/components/material/material.module';

import { CreateSchemaPageComponent } from './create-schema-page.component';

describe('CreateSchemaPageComponent', () => {
  let component: CreateSchemaPageComponent;
  let fixture: ComponentFixture<CreateSchemaPageComponent>;
  let fb: FormBuilder;
  beforeEach(async () => {
    let fb: FormBuilder = new FormBuilder();
    await TestBed.configureTestingModule({
      declarations: [CreateSchemaPageComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FormBuilder, useValue: {} },
        { provide: Router, useValue: {} },
        FormBuilder,
      ],
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

  //TODO:
  it('should send a post request to the backend');

  //TODO:
  it('should reroute to schema/overview on after a successful post');

  //TODO:
  it('should reroute to schema/overview on after a successful post');
});
