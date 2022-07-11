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
    params = params.append('requestedSelfAttestedAttributes', JSON.stringify(proofTemplate.selfAttestedAttributes)); //prettier-ignore
    if (linkedAttributes.length != 0) {
      params = params.append('autoIssueCredential', JSON.stringify(linkedAttributes)); //prettier-ignore
    }
    return params;
  }
}
