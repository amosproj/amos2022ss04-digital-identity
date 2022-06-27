import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDIToCredentialPopUpComponent } from './add-dito-credential-pop-up.component';

describe('AddDIToCredentialPopUpComponent', () => {
  let component: AddDIToCredentialPopUpComponent;
  let fixture: ComponentFixture<AddDIToCredentialPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDIToCredentialPopUpComponent ]
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
});
