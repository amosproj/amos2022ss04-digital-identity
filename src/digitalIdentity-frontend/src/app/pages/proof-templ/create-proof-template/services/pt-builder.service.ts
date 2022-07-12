import { Injectable } from '@angular/core';
import { proofTemplate } from '../create-proof-template.module';

@Injectable({
  providedIn: 'root',
})
export class PtBuilderService {
  constructor() {}

  buildProofTemplate(
    name: string,
    version: string,
    credDefs: any[],
    selectedAttributes: any[],
    selfAttestedAttribtues: any[]
  ): proofTemplate {
    let reqAttr: object = this.buildRequestedAttributes(selectedAttributes);
    let reqPred: object = this.buildRequestedPredicates(selectedAttributes);

    let pt: proofTemplate = {
      name: name,
      version: version,
      credDefs: credDefs,
      credDefStringAttributes: reqAttr,
      credDefStringPredicates: reqPred,
      selfAttestedAttributes: selfAttestedAttribtues,
      image: null,
    };
    return pt;
  }

  private buildRequestedAttributes(
    selectedAttributesWithPredicates: any[]
  ): object {
    let requestedAttributes: any = {};
    selectedAttributesWithPredicates.forEach((ele) => {
      // ele is the selected attribute with params element. it will look like this:
      // {
      //     "Name": {
      //         "credDefId": "GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00",
      //         "selected": true,
      //         "filter": "no filter",
      //         "value": 0
      //     },
      //     "Wohnort": {
      //         "credDefId": "GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00",
      //         "selected": true,
      //         "filter": "no filter",
      //         "value": 0
      //     }
      // }
      let credDefId = ele[Object.keys(ele)[0]].credDefId;
      let inner = this.extract_AttrForOneCredDef(ele);
      if (inner.attributeNames.length != 0) {
        requestedAttributes[credDefId] = inner;
      }
    });

    return requestedAttributes;
    // format of requested predicates:
    // {
    //    "credDefId1": innerOf1
    //    "credDefId2": innerOf2
    // }
  }

  private extract_AttrForOneCredDef(selectedAttribte: any) {
    let attributeNames = Object.keys(selectedAttribte);
    let attributeNamesArray: any[] = [];

    attributeNames.forEach((attrName) => {
      let obj = selectedAttribte[attrName];
      if (obj.selected && obj.filter == 'no filter') {
        attributeNamesArray.push({ attributeName: attrName });
      }
    });
    let inner = { attributeNames: attributeNamesArray };
    /* inner has the following format now
    inner = "attributeNames":[
            {"attributeName":"familyName"},
            {"attributeName":"addressCountry"}
        ],
    */
    return inner;
  }

  private buildRequestedPredicates(
    selectedAttributesWithPredicates: any[]
  ): object {
    let requestedPredicates: any = {};
    selectedAttributesWithPredicates.forEach((ele) => {
      // ele is the selected attribute with params element. it will look like this:
      // {
      //     "Name": {
      //         "credDefId": "GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00",
      //         "selected": true,
      //         "filter": "no filter",
      //         "value": 0
      //     },
      //     "Wohnort": {
      //         "credDefId": "GCevMyEWCa5Fd58gfzkASy:2:Mitarbeiter Ausweis:1.00",
      //         "selected": true,
      //         "filter": "no filter",
      //         "value": 0
      //     }
      // }
      let credDefId = ele[Object.keys(ele)[0]].credDefId;
      let inner = this.extract_PredsForOneCredDef(ele);
      if (inner.length != 0) {
        requestedPredicates[credDefId] = inner;
      }
    });
    return requestedPredicates;
    // format of requested predicates:
    // {
    //    "credDefId1": innerOf1
    //    "credDefId2": innerOf2
    // }
  }

  private extract_PredsForOneCredDef(selectedAttribte: any): any[] {
    let attributeNames = Object.keys(selectedAttribte);
    let arr: any[] = [];

    attributeNames.forEach((attrName) => {
      let obj = selectedAttribte[attrName];
      if (obj.selected && obj.filter != 'no filter') {
        arr.push({
          predicateName: attrName,
          predicateType: this.convertFilterTestToSymbol(obj.filter),
          predicateValue: obj.value,
        });
      }
    });
    //arr has the following format now
    // inner = [
    //   {
    //     predicateName: 'dateOfBirth',
    //     predicateValue: '18',
    //     predicateType: '>',
    //   },
    //   {
    //     predicateName: 'dateOfBirth',
    //     predicateValue: '18',
    //     predicateType: '>',
    //   },
    // ];

    return arr;
  }

  private convertFilterTestToSymbol(filterText: string) {
    switch (filterText) {
      case 'greater than':
        return '>';
      case 'less than':
        return '<';
      case 'greater equal than':
        return '>=';
      case 'less equal than':
        return '<=';
      default:
        return '';
    }
  }
}
