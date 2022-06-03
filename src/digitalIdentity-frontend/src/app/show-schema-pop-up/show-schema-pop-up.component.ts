import { Component, OnInit } from '@angular/core';

export interface attributeType {
  name: string,
  type: string|Date|number
}
export interface schemaData {
  iconUrl: string,
  name: string,
  version: string,
  attributes: attributeType[],
  status: boolean
}


@Component({
  selector: 'app-show-schema-pop-up',
  templateUrl: './show-schema-pop-up.component.html',
  styleUrls: ['./show-schema-pop-up.component.css']
})
export class ShowSchemaPopUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
