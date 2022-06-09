import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface attributeType {
  name: string,
  type: "string"|"date"|"number"
}
export interface schemaData {
  iconUrl: string,
  name: string,
  version: string,
  attributes: attributeType[],
  status: "archieved"|"active"
}


@Component({
  selector: 'app-show-schema-pop-up',
  templateUrl: './show-schema-pop-up.component.html',
  styleUrls: ['./show-schema-pop-up.component.css']
})
export class ShowSchemaPopUpComponent implements OnInit {
  okayButtonString: string = "okay"
  schema: schemaData
  constructor(
    private dialogRef: MatDialogRef<ShowSchemaPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { schemaDetails : schemaData}
  ) {
    if (data == null || data.schemaDetails == null) {
      this.schema = <schemaData>{"iconUrl":"Not found","name":"Not found","version":"Not found","attributes":[<attributeType>{"name":"Not found","type":"string"}],"status":"archieved"}
    }
    else {
      this.schema = data.schemaDetails;
    }
  }

  ngOnInit(): void {
  }
  close() {
    if (isDevMode()) console.log('close window');
    this.dialogRef.close();
  }
}

