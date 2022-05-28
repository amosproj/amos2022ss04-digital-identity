import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchemaPageComponent } from './create-schema-page.component';

describe('CreateSchemaPageComponent', () => {
  let component: CreateSchemaPageComponent;
  let fixture: ComponentFixture<CreateSchemaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSchemaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchemaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
