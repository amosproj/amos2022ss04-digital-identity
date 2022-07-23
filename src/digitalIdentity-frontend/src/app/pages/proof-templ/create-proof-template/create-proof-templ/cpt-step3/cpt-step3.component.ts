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
    return true;
  }

  autoIssueCredential_disabled(): boolean {
    return this.selectedCredDefs.length != 1;
  }
}
