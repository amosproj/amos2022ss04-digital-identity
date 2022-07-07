import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProofTemplateStep1Component } from './create-proof-template-step1.component';

describe('CreateProofTemplateStep1Component', () => {
  let component: CreateProofTemplateStep1Component;
  let fixture: ComponentFixture<CreateProofTemplateStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProofTemplateStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProofTemplateStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
