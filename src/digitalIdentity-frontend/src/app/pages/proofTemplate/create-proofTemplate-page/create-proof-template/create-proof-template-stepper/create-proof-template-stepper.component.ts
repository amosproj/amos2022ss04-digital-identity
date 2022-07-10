import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateProofTemplateStep1Component } from './create-proof-template-step1/create-proof-template-step1.component';
import { CreateProofTemplateStep2Component } from './create-proof-template-step2/create-proof-template-step2.component';
import { CreateProofTemplateStep3Component } from './create-proof-template-step3/create-proof-template-step3.component';
import { CreateProofTemplateStep3bComponent } from './create-proof-template-step3b/create-proof-template-step3b.component';

@Component({
  selector: 'app-create-proof-template-stepper',
  templateUrl: './create-proof-template-stepper.component.html',
  styleUrls: ['./create-proof-template-stepper.component.css'],
})
export class CreateProofTemplateStepperComponent implements OnInit {
  @ViewChild(CreateProofTemplateStep1Component)
  private step1!: CreateProofTemplateStep1Component;

  @ViewChild(CreateProofTemplateStep2Component)
  private step2!: CreateProofTemplateStep2Component;

  @ViewChild(CreateProofTemplateStep3Component)
  private step3!: CreateProofTemplateStep3Component;

  @ViewChild(CreateProofTemplateStep3bComponent)
  private step3b!: CreateProofTemplateStep3bComponent;

  constructor() {}

  ngOnInit(): void {}

  proofTemplateName(): string {
    if (!this.step1) return '';
    return this.step1.getFormValue('name');
  }

  proofTemplateVersion(): string {
    if (!this.step1) return '';
    return this.step1.getFormValue('version');
  }

  // step 2
  selectedCredDefs(): any[] {
    if (!this.step2) return [];
    return this.step2.credDefSelections;
  }

  selectedAttributes(): any[] {
    if (!this.step2) return [];
    return this.step2.additionalData;
  }

  step2_completed(): boolean {
    if (!this.step1 || !this.step2) return false;
    return this.step1.completed() && this.step2.completed();
  }

  // step 3
  autoIssueCredential(): boolean {
    if (!this.step3) return false;
    return this.step3.autoIssueCredential;
  }

  step3_completed(): boolean {
    if (!this.step1 || !this.step2 || !this.step3) return false;
    return (
      this.step1.completed() && this.step2.completed() && this.step3.completed()
    );
  }

  // step 3b
  autoIssueCredDef(): any[] {
    if (!this.step3b) return [];
    return this.step3b.goalCredDef;
  }

  linkedAttributes(): any[] {
    if (!this.step3b) return [];
    return this.step3b.tableAttrData;
  }

  step3b_completed(): boolean {
    if (!this.step3b) return false;
    return (
      this.step1.completed() &&
      this.step2.completed() &&
      this.step3.completed() &&
      this.step3b.completed()
    );
  }
}
