import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/components/material/material.module';
import { CreateProofTemplateStepperComponent } from './create-proof-template-stepper/create-proof-template-stepper.component';
import { CreateProofTemplateStep1Component } from './create-proof-template-stepper/create-proof-template-step1/create-proof-template-step1.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateProofTemplateStepperComponent,
    CreateProofTemplateStep1Component,
  ],
  exports: [CreateProofTemplateStepperComponent],
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
})
export class CreateProofTemplateModule {}
