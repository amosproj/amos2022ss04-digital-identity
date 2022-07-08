import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateProofTemplateStep3Component } from '../create-proof-template-step3/create-proof-template-step3.component';
import { CreateProofTemplateStep1Component } from './create-proof-template-step1/create-proof-template-step1.component';
import { CreateProofTemplateStep2Component } from './create-proof-template-step2/create-proof-template-step2.component';

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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    // Redefine methods to link to step vars and methods
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => {
      // step 1 functions
      this.proofTemplateName = () => this.step1.getFormValue('name');
      this.proofTemplateVersion = () => this.step1.getFormValue('version');
      // step 2 functions
      this.selectedCredDefs = () => this.step2.credDefSelections;
      this.selectedAttributes = () => this.step2.additionalData;
      this.step2_completed = () =>
        this.step1.completed() && this.step2.completed();

      // step 3 functions
      this.autoIssueCredential = () => this.step3.autoIssueCredential;
      this.step3_completed = () =>
        this.step1.completed() &&
        this.step2.completed() &&
        this.step3.completed();
    }, 0);
  }

  proofTemplateName(): string {
    return '';
  }

  proofTemplateVersion(): string {
    return '';
  }

  // step 2
  selectedCredDefs(): any[] {
    return [];
  }

  selectedAttributes(): any[] {
    return [];
  }

  step2_completed(): boolean {
    return false;
  }

  // step 3
  autoIssueCredential(): boolean {
    return false;
  }

  step3_completed(): boolean {
    return false;
  }

  // step 3b
  autoIssueCredDef(): any[] {
    return [];
  }
}
