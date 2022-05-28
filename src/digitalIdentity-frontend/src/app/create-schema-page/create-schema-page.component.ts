import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-schema-page',
  templateUrl: './create-schema-page.component.html',
  styleUrls: ['./create-schema-page.component.css']
})
export class CreateSchemaPageComponent implements OnInit {
  schemaFormGroup: FormGroup
  schema = {
    iconUrl:"",
    name:"",
    version:"",
    attributes:[
      {
        name:"",
        value:""
      }
    ]
  }
  constructor(private fb: FormBuilder) {
    this.schemaFormGroup = this.fb.group({
      name : ["",Validators.required],
      version: ["",Validators.required],
      attributes: this.fb.group({

      })
    })
  }

  ngOnInit(): void {
  }
  addAttribute() {
    this.getAttributes().push(this.newAttribute())
  }
  newAttribute() : FormGroup {
    this.schema.attributes.push({name:"",value:""})
    return this.fb.group({
      name: ['',Validators.required]
    })
  }
   getAttributes() {
     return <FormArray> this.schemaFormGroup.get('attributes')
   }
   createSchemaButtonEvent() {
   }

}
