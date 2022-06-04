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
  status: boolean
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
    @Inject(MAT_DIALOG_DATA) private data: { schema : schemaData}
  ) {
    this.schema = data.schema;
    this.schema = <schemaData>{"iconUrl":"test","name":"test","version":"2.0","attributes":[<attributeType>{"name":"testAttribute","type":"string"}],"status":false}
  }

  ngOnInit(): void {
  }
  close() {
    if (isDevMode()) console.log('close window');
    this.dialogRef.close();
  }

}

// import { ThisReceiver } from '@angular/compiler';
// import { Component, Inject, isDevMode, OnInit } from '@angular/core';
// import {
//   MAT_DIALOG_DATA,
//   MatDialog,
//   MatDialogRef,
// } from '@angular/material/dialog';

// @Component({
//   selector: 'app-information-pop-up',
//   templateUrl: './information-pop-up.component.html',
//   styleUrls: ['./information-pop-up.component.css'],
// })
// export class InformationPopUpComponent implements OnInit {
//   okayButtonString: string = 'Okay';
//   header: string = '';
//   text: string = '';

//   constructor(
//     private dialogRef: MatDialogRef<InformationPopUpComponent>,
//     @Inject(MAT_DIALOG_DATA) private data: { header: string; text: string }
//   ) {
//     if (isDevMode()) {
//       this.okayButtonString = 'Aye!';
//     }
//     this.header = data.header;
//     this.text = data.text;
//   }
//   close() {
//     if (isDevMode()) console.log('close window');
//     this.dialogRef.close();
//   }

//   ngOnInit(): void {}
// }

