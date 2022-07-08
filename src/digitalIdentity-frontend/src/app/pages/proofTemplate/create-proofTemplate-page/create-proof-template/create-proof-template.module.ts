import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/components/material/material.module';
import { CreateProofTemplateStepperComponent } from './create-proof-template-stepper/create-proof-template-stepper.component';
import { CreateProofTemplateStep1Component } from './create-proof-template-stepper/create-proof-template-step1/create-proof-template-step1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProofTemplateStep2Component } from './create-proof-template-stepper/create-proof-template-step2/create-proof-template-step2.component';
import { FilteredTableComponent } from 'src/app/shared/filtered-table/filtered-table.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CreateProofTemplateStepperComponent,
    CreateProofTemplateStep1Component,
    CreateProofTemplateStep2Component,
  ],
  exports: [CreateProofTemplateStepperComponent],
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, SharedModule],
})
export class CreateProofTemplateModule {}
