import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredDefDetailPopUpComponent } from './cred-def-detail-pop-up.component';

describe('CredDefDetailPopUpComponent', () => {
  let component: CredDefDetailPopUpComponent;
  let fixture: ComponentFixture<CredDefDetailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredDefDetailPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
