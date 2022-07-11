import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateProofTemplateStepperComponent } from './create-proof-templ/create-proof-templ.component';
import { SelectedCredDefListComponent } from './create-proof-templ/cred-def-list/selected-cred-def-list.component';
import { AttrListItemComponent } from './create-proof-templ/attr-list-item/attr-list-item.component';
import { AutoLinkedAttrComponent } from './create-proof-templ/auto-linked-attr/auto-linked-attr.component';
import { CptStep1Component } from './create-proof-templ/cpt-step1/cpt-step1.component';
import { CptStep2Component } from './create-proof-templ/cpt-step2/cpt-step2.component';
import { CptStep3Component } from './create-proof-templ/cpt-step3/cpt-step3.component';
import { CptStep4Component } from './create-proof-templ/cpt-step4/cpt-step4.component';
import { CptStep3bComponent } from './create-proof-templ/cpt-step3b/cpt-step3b.component';

export interface proofTemplate {
  name: string;
  version: string;
  credDefs: any[];
  credDefStringAttributes: object;
  credDefStringPredicates: object;
  selfAttestedAttributes: any[];
  image: File | null;
}

export interface Attribute {
  attribID: number;
  name: string;
  value: string | number | Date;
  type: 'String' | 'Number' | 'Email' | 'Date';
}

@NgModule({
  declarations: [
    CreateProofTemplateStepperComponent,
    CptStep1Component,
    CptStep2Component,
    CptStep3Component,
    CptStep3bComponent,
    CptStep4Component,
    SelectedCredDefListComponent,
    AttrListItemComponent,
    AutoLinkedAttrComponent,
  ],
  exports: [CreateProofTemplateStepperComponent],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CreateProofTemplateModule {}
