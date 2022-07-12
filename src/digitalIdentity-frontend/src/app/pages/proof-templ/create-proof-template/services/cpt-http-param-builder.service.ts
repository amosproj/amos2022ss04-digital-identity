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

  buildHttpParamsWith(
    proofTemplate: proofTemplate,
    linkedAttributes: linkedAttribute[]
  ): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('authorization', 'passing');
    params = params.append('name', proofTemplate.name);
    params = params.append('version', proofTemplate.version);
    params = params.append('requestedAttributes',JSON.stringify(proofTemplate.credDefStringAttributes)); //prettier-ignore
    params = params.append('requestedPredicates', JSON.stringify(proofTemplate.credDefStringPredicates)); //prettier-ignore
    // params = params.append('requestedSelfAttestedAttributes', JSON.stringify(proofTemplate.selfAttestedAttributes)); //prettier-ignore
    let selfAttestedAttributes = this.buildSelfAttestedAttributes(
      proofTemplate,
      linkedAttributes
    );
    params = params.append('requestedSelfAttestedAttributes', JSON.stringify(selfAttestedAttributes)); //prettier-ignore
    return params;
  }

  private buildSelfAttestedAttributes(
    proofTemplate: proofTemplate,
    linkedAttributes: linkedAttribute[]
  ): object[] {
    let arr: object[] = [];
    proofTemplate.selfAttestedAttributes.forEach((ele: object) =>
      arr.push(ele)
    );
    linkedAttributes.forEach((ele: linkedAttribute) => {
      if (ele.selfAttested) {
        arr.push({
          attributeName: ele.destAttribute,
        });
      }
    });

    return arr;
  }

  buildAutoIssueActionBody(
    goalCredDef: any,
    linkedAttributes: linkedAttribute[]
  ): object {
    let autoIssueAction = this.buildAutoIssueCredentialAction(goalCredDef,linkedAttributes); //prettier-ignore
    return autoIssueAction;
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
