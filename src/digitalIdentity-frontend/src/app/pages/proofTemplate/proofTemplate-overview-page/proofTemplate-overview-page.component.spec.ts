import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofTemplateOverviewPageComponent } from './proofTemplate-overview-page.component';

describe('ProofOverviewPageComponent', () => {
  let component: ProofTemplateOverviewPageComponent;
  let fixture: ComponentFixture<ProofTemplateOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofTemplateOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofTemplateOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
