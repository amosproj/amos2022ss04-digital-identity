import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordPopUpComponent } from './forgot-password-pop-up.component';

describe('ForgotPasswordPopUpComponent', () => {
  let component: ForgotPasswordPopUpComponent;
  let fixture: ComponentFixture<ForgotPasswordPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
