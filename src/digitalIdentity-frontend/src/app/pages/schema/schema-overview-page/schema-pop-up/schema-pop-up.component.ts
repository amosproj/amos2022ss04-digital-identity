import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { schemaDataType } from '../schema-overview-page.component';
@Component({
  selector: 'app-schema-pop-up',
  templateUrl: './schema-pop-up.component.html',
  styleUrls: ['./schema-pop-up.component.css'],
})
export class SchemaPopUpComponent implements OnInit {
  okayButtonString: string = 'Okay';
  header: string = '';
  schema: schemaDataType;

  constructor(
    private dialogRef: MatDialogRef<SchemaPopUpComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { header: string; schema: schemaDataType }
  ) {
    if (isDevMode()) {
      this.okayButtonString = 'Aye!';
    }
    this.header = data.header;
    this.schema = data.schema;
  }

  close() {
    if (isDevMode()) console.log('close window');
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
