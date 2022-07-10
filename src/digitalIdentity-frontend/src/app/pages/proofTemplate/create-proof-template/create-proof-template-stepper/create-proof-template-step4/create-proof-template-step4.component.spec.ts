import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProofTemplateStep4Component } from './create-proof-template-step4.component';

describe('CreateProofTemplateStep4Component', () => {
  let component: CreateProofTemplateStep4Component;
  let fixture: ComponentFixture<CreateProofTemplateStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProofTemplateStep4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProofTemplateStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
