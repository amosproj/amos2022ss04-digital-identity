import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProofTemplateStep3Component } from './create-proof-template-step3.component';

describe('CreateProofTemplateStep3Component', () => {
  let component: CreateProofTemplateStep3Component;
  let fixture: ComponentFixture<CreateProofTemplateStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProofTemplateStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProofTemplateStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
