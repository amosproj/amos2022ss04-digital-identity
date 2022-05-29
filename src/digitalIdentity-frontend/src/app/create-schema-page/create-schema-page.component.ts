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
  schemaTmp : {
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
      iconUrl : ["../../assets/images/DIdentity.png",Validators.required],
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

  addAttribute() {
    this.saveType()
    this.attributes.push(this.newAttribute(this.nextType))
  }

  newAttribute(type : String) : FormGroup {
    let attribSize = this.schemaTmp.attributes.length
    switch(type) {
      case "String":
        this.schemaTmp.attributes.push({attribID:attribSize,name:"", value:"", type:"String"})
        return this.fb.group({
          name: ['',Validators.required]
        })
      case "Email":
        this.schemaTmp.attributes.push({attribID:attribSize,name:"", value:"", type:"Email"})
        return this.fb.group({
          name: ['',[Validators.required,Validators.email]]
        })
      case "Number":
        this.schemaTmp.attributes.push({attribID:attribSize,name:"", value:NaN, type:"Number"})
        return this.fb.group({
          name: ['',Validators.required] //TODO add Validator
        })
      case "Date":
        this.schemaTmp.attributes.push({attribID:attribSize,name:"", value:new Date(), type:"Date"})
        return this.fb.group({
          name: ['',Validators.required] //TODO add Validator
        })
      default:
          this.schemaTmp.attributes.push({attribID:attribSize,name:"", value:"", type:"String"})
        return this.fb.group({
          name: ['',Validators.required]
        })
    }
  }

  deleteAttribute(idx: number) {
    if (idx == this.schemaTmp.attributes.length - 1) {
      this.schemaTmp.attributes.pop(); //remove last element
    }
    else if (idx < this.schemaTmp.attributes.length) {
      for (let i = idx; i < this.schemaTmp.attributes.length - 1;i++) {
        this.schemaTmp.attributes[i] = this.schemaTmp.attributes[i+1]
        this.schemaTmp.attributes[i].attribID -= 1
      }
      this.schemaTmp.attributes.pop();
    }
    (<FormArray> this.schemaFormGroup.controls['attributes']).removeAt(idx);
  }

  get attributes() :FormArray {
    return <FormArray> this.schemaFormGroup.get('attributes')
  }

  createSchemaButtonEvent() {
    this.schemaTmp.name = this.schemaFormGroup.value['name']
    this.schemaTmp.version = this.schemaFormGroup.value['version']
    this.schemaTmp.iconUrl = this.schemaFormGroup.value['iconUrl']
    for (let elem of this.schemaTmp.attributes) {
      elem.name = this.schemaFormGroup.value['attributes'][elem.attribID]['name']
    }

    this.schema.name = this.schemaTmp.name
    this.schema.version = this.schemaTmp.version
    this.schema.iconUrl = this.schemaTmp.iconUrl

    for (let i = 0; i < this.schemaTmp.attributes.length; i++) {
      if (i >= this.schema.attributes.length) {
        this.schema.attributes.push({attribID:i,name:"", value:"", type:"String"})
      }
      this.schema.attributes[i].name = this.schemaTmp.attributes[i].name
      this.schema.attributes[i].type = this.schemaTmp.attributes[i].type
      this.schema.attributes[i].attribID = this.schemaTmp.attributes[i].attribID
      this.schema.attributes[i].value = this.schemaTmp.attributes[i].value
    }
    for (let i = 0; i < this.schema.attributes.length - this.schemaTmp.attributes.length; i++) {
      this.schema.attributes.pop();
    }
  }

}
