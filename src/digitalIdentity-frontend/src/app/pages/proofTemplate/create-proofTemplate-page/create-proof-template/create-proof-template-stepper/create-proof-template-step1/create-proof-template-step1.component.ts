import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-proof-template-step1',
  templateUrl: './create-proof-template-step1.component.html',
  styleUrls: ['./create-proof-template-step1.component.css'],
})
export class CreateProofTemplateStep1Component implements OnInit {
  formGroup: FormGroup;

  // file selector
  fileName: string = '';
  image: any = null;

  constructor(public fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      version: ['', [Validators.required, versionValidator()]],
    });
  }

  ngOnInit(): void {}

  completed() {
    // return this.formGroup.valid;
    return true;
  }

  selectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
    } else {
      this.image = null;
    }

    // this.error = '';

    let fileType = event.target.files[0].type;

    if (fileType.match(/image\/*/) == null) {
      // this.error = 'Only images are supported.';
      return;
    }

    this.fileName = event.target.files[0].name;

    // let reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);

    // reader.onload = (_event) => {
    //   this.proofTemplateFormGroup.controls['iconUrl'].setValue(reader.result); //the url of the uploaded image is here
    // };
  }
}

export function versionValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    if (control.pristine) {
      return null;
    }
    if (/^\d+(\.?\d+)*$/.test(control.value)) {
      return null;
    } else {
      return { message: 'falseFormat' };
    }
  };
}
