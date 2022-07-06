import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofActivitiesComponent } from './proof-activities.component';

describe('ProofActivitiesComponent', () => {
  let component: ProofActivitiesComponent;
  let fixture: ComponentFixture<ProofActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
