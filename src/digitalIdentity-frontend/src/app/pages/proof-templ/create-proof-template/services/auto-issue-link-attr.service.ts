import { Injectable } from '@angular/core';
import { linkedAttribute } from '../create-proof-template.module';

@Injectable({
  providedIn: 'root',
})
export class AutoIssueLinkAttrService {
  constructor() {}

  matchAttributes(
    goalAttributes: string[],
    selectedCredDef: any,
    selectedAttributes: any
  ): linkedAttribute[] {
    let linkedAttributes: linkedAttribute[] = [];

    goalAttributes.forEach((attr) => {
      if (selectedAttributes[attr] != undefined) {
        linkedAttributes.push({
          destAttribute: attr,
          selfAttested: false,
          providerCredDefId: selectedCredDef.id,
          providerAttribute: attr,
          // only for frontend:
          providerCredDefAlias: selectedCredDef.alias,
        });
      } else {
        linkedAttributes.push({
          destAttribute: attr,
          selfAttested: true,
          providerCredDefId: '',
          providerAttribute: '',
          // only for frontend:
          providerCredDefAlias: '',
        });
      }
    });
    return linkedAttributes;
  }
}
