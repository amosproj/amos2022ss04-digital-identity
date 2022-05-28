import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-schema-page',
  templateUrl: './create-schema-page.component.html',
  styleUrls: ['./create-schema-page.component.css']
})
export class CreateSchemaPageComponent implements OnInit {
  nextType = "String"
  types = ["String","Email","Number","Date"]
  schemaFormGroup: FormGroup
  schema : {
    iconUrl:String,
    name:String,
    version:String,
    attributes:[
      // {
      //   name:String,
      //   options: [
      //     { value: String, Type: "String" },
      //     { value: Number, Type: "Number" },
      //     { value: String, Type: "Email" },
      //     { value: Date, Type: "Date" }
      //   ],
      // } | {}
      {
        name:String,
        value:String,
        type:"String"
      }|
      {
        name:String,
        value:String,
        type:"Email"
      }|
      {
        name:String,
        value:number,
        type:"Number"
      }|
      {
        name:String,
        value:Date,
        type:"Date"
      }|{}
    ]
  } =
  {iconUrl:"",
  name:"",
  version:"",
  attributes:[
    { name:"",
      value:"",
      type:"String"
    }
  ]
}

  constructor(private fb: FormBuilder) {
    this.schemaFormGroup = this.fb.group({
      iconUrl : ["",Validators.required],
      name : ["",Validators.required],
      version: ["",Validators.required],
      nextType: [""],
      attributes: this.fb.group({
        name: ["",Validators.required],
        type: ["",Validators.required]
      })
    })
  }

  ngOnInit(): void {

  }

  saveType() {
    this.nextType = this.schemaFormGroup.value['nextType']
  }

  addAttribute(type : String) {
    this.attributes.push(this.newAttribute(type))
  }

  newAttribute(type : String) : FormGroup {
    switch(type) {
      case "String":
        this.schema.attributes.push({name:"", value:"", type:"String"})
        return this.fb.group({
          name: ['',Validators.required]
        })
      case "Email":
        this.schema.attributes.push({name:"", value:"", type:"Email"})
        return this.fb.group({
          name: ['',Validators.required,Validators.email]
        })
      case "Number":
        this.schema.attributes.push({name:"", value:NaN, type:"Number"})
        return this.fb.group({
          name: ['',Validators.required] //TODO add Validator
        })
      case "Date":
        this.schema.attributes.push({name:"", value:new Date(), type:"Date"})
        return this.fb.group({
          name: ['',Validators.required] //TODO add Validator
        })
      default:
          this.schema.attributes.push({name:"", value:"", type:"String"})
        return this.fb.group({
          name: ['',Validators.required]
        })
    }
  }

  get attributes() :FormArray {
    return <FormArray> this.schemaFormGroup.get('attributes')
  }

  createSchemaButtonEvent() {

  }

}
