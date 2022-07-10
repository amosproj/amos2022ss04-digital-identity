import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';
import { proofTemplate } from '../../create-proof-template.module';

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
      attributeName: '',
    };
    this.selfAttestedAttribtues.push(attr);
  }

  deleteAttribute(i: number) {
    this.selfAttestedAttribtues.splice(i, 1);
  }

  postCreateProofTemplate() {
    let proofTemplate = this.buildProofTemplate(
      this.proofTemplateName,
      this.proofTemplateVersion,
      this.selectedCredDefs,
      this.selectedAttributes,
      this.selfAttestedAttribtues
    );
    this.sending = true;

    let params = this.buildHttpParamsWith(proofTemplate);
    this.httpService
      .postRequest(
        'create proof template',
        '/proof-template/create',
        proofTemplate,
        params
      )
      .then((response) => {
        this.sending = false;
        this.router.navigate(['/proofTemplate-overview']);
      })
      .catch(() => {
        this.sending = false;
      });
  }

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
      console.log('log', ele);
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
      console.log('log attrname', attrName);
      let obj = selectedAttribte[attrName];
      console.log('log attr', obj);
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
