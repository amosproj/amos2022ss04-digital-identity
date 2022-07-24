import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPopUpComponent } from './schema-pop-up.component';

describe('SchemaPopUpComponent', () => {
  let component: SchemaPopUpComponent;
  let fixture: ComponentFixture<SchemaPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
