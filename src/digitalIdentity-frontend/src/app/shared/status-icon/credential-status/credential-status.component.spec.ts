import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialStatusComponent } from './credential-status.component';

describe('CredentialStatusComponent', () => {
  let component: CredentialStatusComponent;
  let fixture: ComponentFixture<CredentialStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredentialStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
