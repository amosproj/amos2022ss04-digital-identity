import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface attribute {
  attribID:number
  name:string,
  value:string|number|Date,
  type:"String"|"Number"|"Email"|"Date"
}
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
    attributes:attribute[]
  } =
  {iconUrl:"",
  name:"",
  version:"",
  attributes:[
  ]
}

  constructor(private fb: FormBuilder) {
    this.schemaFormGroup = this.fb.group({
      iconUrl : ["",Validators.required],
      name : ["",Validators.required],
      version: ["",Validators.required],
      nextType: [""],
      attributes: new FormArray([])
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
    let attribSize = this.schema.attributes.length
    switch(type) {
      case "String":
        this.schema.attributes.push({attribID:attribSize,name:"", value:"", type:"String"})
        return this.fb.group({
          name: ['',Validators.required]
        })
      case "Email":
        this.schema.attributes.push({attribID:attribSize,name:"", value:"", type:"Email"})
        return this.fb.group({
          name: ['',[Validators.required,Validators.email]]
        })
      case "Number":
        this.schema.attributes.push({attribID:attribSize,name:"", value:NaN, type:"Number"})
        return this.fb.group({
          name: ['',Validators.required] //TODO add Validator
        })
      case "Date":
        this.schema.attributes.push({attribID:attribSize,name:"", value:new Date(), type:"Date"})
        return this.fb.group({
          name: ['',Validators.required] //TODO add Validator
        })
      default:
          this.schema.attributes.push({attribID:attribSize,name:"", value:"", type:"String"})
        return this.fb.group({
          name: ['',Validators.required]
        })
    }
  }

  get attributes() :FormArray {
    return <FormArray> this.schemaFormGroup.get('attributes')
  }

  createSchemaButtonEvent() {
    this.schema.name = this.schemaFormGroup.value['name']
    this.schema.version = this.schemaFormGroup.value['version']
    this.schema.iconUrl = this.schemaFormGroup.value['iconUrl']
    for (let elem of this.schema.attributes) {
      elem.name = this.schemaFormGroup.value['attributes'][elem.attribID]['name']
      console.log(elem.name)
    }
  }

}
