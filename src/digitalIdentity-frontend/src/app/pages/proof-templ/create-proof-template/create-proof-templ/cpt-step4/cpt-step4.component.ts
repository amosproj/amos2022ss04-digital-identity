import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { linkedAttribute } from '../../create-proof-template.module';
import { CptHttpParamBuilderService } from '../../services/cpt-http-param-builder.service';
import { PtBuilderService } from '../../services/pt-builder.service';

@Component({
  selector: 'app-cpt-step4',
  templateUrl: './cpt-step4.component.html',
  styleUrls: ['./cpt-step4.component.css'],
})
export class CptStep4Component implements OnInit {
  @Input()
  proofTemplateName!: string;

  @Input()
  proofTemplateVersion!: string;

  @Input()
  selectedCredDefs!: any[];

  @Input()
  selectedAttributes!: any[];

  @Input()
  goalCredDef!: any[];

  @Input()
  linkedAttributes!: linkedAttribute[];

  @Input()
  timeout!: string;

  selfAttestedAttributes: any[] = [];
  nextType: string = 'String';
  types = ['String', 'Email', 'Number', 'Date'];

  sending: boolean = false;

  constructor(
    private httpService: BackendHttpService,
    private router: Router,
    private proofTemplateBuilder: PtBuilderService,
    private httpParamBuilder: CptHttpParamBuilderService
  ) {}

  ngOnInit(): void {}

  addAttribute() {
    let attr = {
      attributeName: '',
    };
    this.selfAttestedAttributes.push(attr);
  }

  deleteAttribute(i: number) {
    this.selfAttestedAttributes.splice(i, 1);
  }

  postCreateProofTemplate() {
    let proofTemplate = this.proofTemplateBuilder.buildProofTemplate(
      this.proofTemplateName,
      this.proofTemplateVersion,
      this.selectedCredDefs,
      this.selectedAttributes,
      this.selfAttestedAttributes
    );
    this.sending = true;

    let params = this.httpParamBuilder.buildHttpParamsWith(
      proofTemplate,
      this.linkedAttributes
    );
    let body: object | null = null;
    if (this.linkedAttributes.length != 0) {
      body = this.httpParamBuilder.buildAutoIssueActionBody(
        this.goalCredDef,
        this.linkedAttributes,
        this.timeout
      );
    }
    this.httpService
      .postRequest(
        'create proof template',
        '/proof-template/create',
        body,
        params
      )
      .then(() => {
        this.sending = false;
        this.router.navigate(['/proofTemplate-overview']);
      })
      .catch(() => {
        this.sending = false;
      });
  }
}
