import { Component, OnInit, ViewChild } from '@angular/core';
import { CptStep1Component } from './cpt-step1/cpt-step1.component';
import { CptStep2Component } from './cpt-step2/cpt-step2.component';
import { CptStep3Component } from './cpt-step3/cpt-step3.component';
import { CptStep3bComponent } from './cpt-step3b/cpt-step3b.component';

@Component({
  selector: 'app-create-proof-templ',
  templateUrl: './create-proof-templ.component.html',
  styleUrls: ['./create-proof-templ.component.css'],
})
export class CreateProofTemplateComponent implements OnInit {
  @ViewChild(CptStep1Component)
  private step1!: CptStep1Component;

  @ViewChild(CptStep2Component)
  private step2!: CptStep2Component;

  @ViewChild(CptStep3Component)
  private step3!: CptStep3Component;

  @ViewChild(CptStep3bComponent)
  private step3b!: CptStep3bComponent;

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
  goalCredDef(): any[] {
    if (!this.step3b) return [];
    return this.step3b.goalCredDef;
  }

  linkedAttributes(): any[] {
    if (!this.step3b) return [];
    return this.step3b.linkedAttributes;
  }

  timeout(): string {
    if (!this.step3b) return '';
    return this.step3b.timeout;
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
