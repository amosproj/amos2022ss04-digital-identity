import { Component, Inject, InjectionToken, Input, isDevMode, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-credDef-table-pop-up',
  templateUrl: './table-pop-up.component.html',
  styleUrls: ['./table-pop-up.component.css']
})
export class TablePopUpComponent implements OnInit {
  displayedColNames = ['DI','assigned','revoked','active']
  internalColNames = ['alias','assigned','revoked','active']
  displayedColSelectNames = ['All','DI','assigned','revoked','active']
  internalColSelectNames = ['all','alias','assigned','revoked','active']
  tableData:any[] = [];
  buttonFunctions:((arg0:any,arg1:any,arg2:any) => void)[] = [((arg0,arg1,arg2) => {""})]
  // addDItoCredDef:()=>void
  credDef: any
  dataLoaded = false

  constructor(private thisDialogRef: MatDialogRef<TablePopUpComponent>,
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: {credDef:any, addDItoCredDef:()=>void}) {
        this.credDef = data.credDef
        // this.addDItoCredDef = data.addDItoCredDef
        this.getDIsToCredDef()
       }

  ngOnInit(): void {
  }


  getDIsToCredDef() {
    if (isDevMode()) {
      console.log('got all DIs to CredDef' + this.credDef.alias)
    }
    this.tableData = [{
      alias: 'Bernd',
      assigned: '2021',
      revoked:'2022',
      active: false
    },
    {
      alias: 'Arnulf',
      assigned: '2020',
      revoked:null,
      active: true
    }]
    this.dataLoaded = true;
  }

  showDetailsToCredDI(idx: number,credData:any[],dialogRef:MatDialog) {
    let di = credData[idx];
    if (isDevMode()) {
      console.log('show Details to credential from DI ' + di.alias)
    }
  }

  openAddDIWindow() {
    if (isDevMode()) {
      console.log("AddDI")
    }
  }

  close() {
    if (isDevMode()) console.log('close window');
    this.thisDialogRef.close();
  }

}

