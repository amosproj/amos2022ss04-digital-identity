import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProofTemplateStepperComponent } from './create-proof-template-stepper.component';

describe('CreateProofTemplateStepperComponent', () => {
  let component: CreateProofTemplateStepperComponent;
  let fixture: ComponentFixture<CreateProofTemplateStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProofTemplateStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProofTemplateStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
