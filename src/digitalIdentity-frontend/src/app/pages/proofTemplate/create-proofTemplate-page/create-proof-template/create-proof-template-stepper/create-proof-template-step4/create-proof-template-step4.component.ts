import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-proof-template-step4',
  templateUrl: './create-proof-template-step4.component.html',
  styleUrls: ['./create-proof-template-step4.component.css'],
})
export class CreateProofTemplateStep4Component implements OnInit {
  @Input()
  selectedCredDefs!: any[];

  @Input()
  selectedAttributes!: any[];

  selfAttestedAttribtues: any[] = [];
  nextType: string = 'String';
  types = ['String', 'Email', 'Number', 'Date'];

  constructor() {}

  ngOnInit(): void {}

  addAttribute() {
    let attr = {
      name: '',
    };
    this.selfAttestedAttribtues.push(attr);
  }

  deleteAttribute(i: number) {
    // this.selectedAttributes = this.selectedAttributes.filter();
    // console.log(this.selfAttestedAttribtues);
    // console.log(this.selfAttestedAttribtues.splice(i, 1));
    this.selfAttestedAttribtues.splice(i, 1);
    // console.log(this.selfAttestedAttribtues);
  }

  log() {
    console.log(this);
  }
}
