import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-information-pop-up',
  templateUrl: './information-pop-up.component.html',
  styleUrls: ['./information-pop-up.component.css'],
})
export class InformationPopUpComponent implements OnInit {
  okayButtonString: string = 'Okay';
  header: string = '';
  text: string = '';
  isSuccessData = true;

  constructor(
    private dialogRef: MatDialogRef<InformationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { header: string; text: string }
  ) {
    if (isDevMode()) {
      this.okayButtonString = 'Aye!';
    }
    this.header = data.header;
    this.text = data.text;
    this.isSuccessData = this.header.includes('Success');
    if (isDevMode()) {
      console.log('Create info popup');
    }
  }
  close() {
    if (isDevMode()) console.log('close window');
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
