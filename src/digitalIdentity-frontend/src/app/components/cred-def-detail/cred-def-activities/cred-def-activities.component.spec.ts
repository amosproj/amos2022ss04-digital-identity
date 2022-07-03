import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredDefActivitiesComponent } from './cred-def-activities.component';

describe('CredDefActivitiesComponent', () => {
  let component: CredDefActivitiesComponent;
  let fixture: ComponentFixture<CredDefActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredDefActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
