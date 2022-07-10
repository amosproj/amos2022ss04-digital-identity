import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-create-proof-template-step4',
  templateUrl: './create-proof-template-step4.component.html',
  styleUrls: ['./create-proof-template-step4.component.css'],
})
export class CreateProofTemplateStep4Component implements OnInit {
  @Input()
  proofTemplateName!: string;

  @Input()
  proofTemplateVersion!: string;

  @Input()
  selectedCredDefs!: any[];

  @Input()
  selectedAttributes!: any[];

  @Input()
  linkedAttributes!: any[];

  selfAttestedAttribtues: any[] = [];
  nextType: string = 'String';
  types = ['String', 'Email', 'Number', 'Date'];

  sending: boolean = false;

  constructor(public httpService: BackendHttpService, public router: Router) {}

  ngOnInit(): void {}

  addAttribute() {
    let attr = {
      name: '',
    };
    this.selfAttestedAttribtues.push(attr);
  }

  deleteAttribute(i: number) {
    this.selfAttestedAttribtues.splice(i, 1);
  }

  postCreateProofTemplate() {
    this.sending = true;
    setTimeout(() => (this.sending = false), 5000);

    // let proofTemplate = buildProofTemplate();
    // let params = this.httpService
    //   .postRequest(
    //     'create proof template',
    //     '/proof-template/create',
    //     this.proofTemplateFormGroup.value,
    //     params
    //   )
    //   .then((response) => {
    //     this.sending = false;
    //     this.router.navigate(['/proofTemplate-overview']);
    //   })
    //   .catch(() => {
    //     this.sending = false;
    //   });
  }

  // httpParamsWith(proofTemplate: proofTemplate): HttpParams {
  //   let params: HttpParams = new HttpParams();
  //   params = params.append('authorization', 'passing');
  //   params = params.append('name', proofTemplate.name);
  //   params = params.append('version', proofTemplate.version);
  //   params = params.append('requestedAttributes', proofTemplate.credDefStringAttributes); //prettier-ignore
  //   params = params.append('requestedPredicates', proofTemplate.credDefStringPredicates); //prettier-ignore
  //   params = params.append('requestedSelfAttestedAttributes', JSON.stringify(proofTemplate.attributes)); //prettier-ignore
  //   return params;
  // }
}
