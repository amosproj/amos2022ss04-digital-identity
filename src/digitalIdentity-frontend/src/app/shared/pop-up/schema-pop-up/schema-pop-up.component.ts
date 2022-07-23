import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-schema-pop-up',
  templateUrl: './schema-pop-up.component.html',
  styleUrls: ['./schema-pop-up.component.css']
})
export class SchemaPopUpComponent implements OnInit {

  okayButtonString: string = 'Okay';
  header: string = '';
  text: string = '';

  constructor(
    private dialogRef: MatDialogRef<SchemaPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { header: string; text: string;}
  ) {
    if (isDevMode()) {
      this.okayButtonString = 'Aye!';
    }
    this.header = data.header;
    this.text = data.text;
    if (isDevMode()) {
      console.log('Create info popup');
      console.log(data.text);
      console.log(data.header);
    }
  }
  close() {
    if (isDevMode()) console.log('close window');
    this.dialogRef.close();
  }

  ngOnInit(): void {}

}
