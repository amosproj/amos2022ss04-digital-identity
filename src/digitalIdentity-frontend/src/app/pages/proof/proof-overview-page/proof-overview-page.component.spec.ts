import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofOverviewPageComponent } from './proof-overview-page.component';

describe('ProofOverviewPageComponent', () => {
  let component: ProofOverviewPageComponent;
  let fixture: ComponentFixture<ProofOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
