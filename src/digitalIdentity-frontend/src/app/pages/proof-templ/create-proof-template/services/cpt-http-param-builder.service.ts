import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  linkedAttribute,
  proofTemplate,
} from '../create-proof-template.module';

@Injectable({
  providedIn: 'root',
})
export class CptHttpParamBuilderService {
  constructor() {}

  buildHttpParamsWith(proofTemplate: proofTemplate): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('name', proofTemplate.name);
    params = params.append('version', proofTemplate.version);
    params = params.append('requestedAttributes',JSON.stringify(proofTemplate.credDefStringAttributes)); //prettier-ignore
    params = params.append('requestedPredicates', JSON.stringify(proofTemplate.credDefStringPredicates)); //prettier-ignore
    params = params.append('requestedSelfAttestedAttributes', JSON.stringify(proofTemplate.selfAttestedAttributes)); //prettier-ignore
    return params;
  }

  buildAutoIssueActionBody(
    goalCredDef: any,
    linkedAttributes: linkedAttribute[]
  ): object {
    let autoIssueAction = this.buildAutoIssueCredentialAction(goalCredDef,linkedAttributes); //prettier-ignore
    // return JSON.stringify({
    //   autoIssueCredential: autoIssueAction,
    // });
    return autoIssueAction;
    // return JSON.stringify({ userName: 'johnny', password: 'password' });
    // return { userName: 'johnny', password: 'password' };
  }

  private buildAutoIssueCredentialAction(
    goalCredDef: any,
    linkedAttributes: linkedAttribute[]
  ): object {
    return {
      proofTemplateId: 'TBD',
      goalCredDefId: goalCredDef.id,
      timeout: '7d',
      mapping: linkedAttributes,
    };
  }
}
