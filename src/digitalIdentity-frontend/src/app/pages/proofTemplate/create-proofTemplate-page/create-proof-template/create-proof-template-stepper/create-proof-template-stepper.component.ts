import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateProofTemplateStep2Component } from './create-proof-template-step2/create-proof-template-step2.component';

@Component({
  selector: 'app-create-proof-template-stepper',
  templateUrl: './create-proof-template-stepper.component.html',
  styleUrls: ['./create-proof-template-stepper.component.css'],
})
export class CreateProofTemplateStepperComponent implements OnInit {
  selectedCredDefs: any = [];

  @ViewChild(CreateProofTemplateStep2Component)
  private step2!: CreateProofTemplateStep2Component;

  credDefSelections(): any[] {
    return [];
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(
      () => (this.credDefSelections = () => this.step2.credDefSelections),
      0
    );
  }

  step2_completed(): boolean {
    if (this.step2) return this.step2.completed();
    else return false;
  }
}
