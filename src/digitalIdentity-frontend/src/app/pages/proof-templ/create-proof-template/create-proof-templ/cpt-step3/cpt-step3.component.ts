import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpt-step3',
  templateUrl: './cpt-step3.component.html',
  styleUrls: ['./cpt-step3.component.css'],
})
export class CptStep3Component implements OnInit {
  constructor() {}

  @Input()
  selectedCredDefs!: any[];
  autoIssueCredential: boolean = false;

  ngOnInit(): void {}

  completed(): boolean {
    // returns true if checkbox one cred def is selected or
    // if the automatic aciton cred issue is not selected
    return this.selectedCredDefs.length == 1 || !this.autoIssueCredential;
  }

  autoIssueCredential_disabled(): boolean {
    // enables the autoIssue checkbox, if it is checked or there is only one cred def selected
    let enabled = this.autoIssueCredential || this.selectedCredDefs.length == 1;
    return !enabled;
  }
}
