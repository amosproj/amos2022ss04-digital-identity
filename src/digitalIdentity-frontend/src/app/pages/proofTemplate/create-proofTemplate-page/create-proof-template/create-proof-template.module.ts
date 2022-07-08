import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/components/material/material.module';
import { CreateProofTemplateStepperComponent } from './create-proof-template-stepper/create-proof-template-stepper.component';
import { CreateProofTemplateStep1Component } from './create-proof-template-stepper/create-proof-template-step1/create-proof-template-step1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProofTemplateStep2Component } from './create-proof-template-stepper/create-proof-template-step2/create-proof-template-step2.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttributeListItemComponent } from './create-proof-template-stepper/attribute-list-item/attribute-list-item.component';
import { CreateProofTemplateStep3Component } from './create-proof-template-step3/create-proof-template-step3.component';
import { MatCheckbox } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    CreateProofTemplateStepperComponent,
    CreateProofTemplateStep1Component,
    CreateProofTemplateStep2Component,
    CreateProofTemplateStep3Component,
    AttributeListItemComponent,
  ],
  exports: [CreateProofTemplateStepperComponent],
  imports: [
    MaterialModule,
    // MatCheckbox,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CreateProofTemplateModule {}
