import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-proof-template-step3',
  templateUrl: './create-proof-template-step3.component.html',
  styleUrls: ['./create-proof-template-step3.component.css'],
})
export class CreateProofTemplateStep3Component implements OnInit {
  constructor() {}

  @Input()
  selectedCredDefs!: any[];
  autoIssueCredential: boolean = false;

  ngOnInit(): void {}

  completed(): boolean {
    return true;
  }

  autoIssueCredential_disabled(): boolean {
    return this.selectedCredDefs.length != 1;
  }
}
