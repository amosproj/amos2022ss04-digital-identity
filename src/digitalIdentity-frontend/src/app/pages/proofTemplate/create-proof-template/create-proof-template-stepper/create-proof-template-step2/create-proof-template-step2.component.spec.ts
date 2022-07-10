import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProofTemplateStep2Component } from './create-proof-template-step2.component';

describe('CreateProofTemplateStep2Component', () => {
  let component: CreateProofTemplateStep2Component;
  let fixture: ComponentFixture<CreateProofTemplateStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProofTemplateStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProofTemplateStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
