import { Component, Inject, InjectionToken, Input, isDevMode, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';

@Component({
  selector: 'app-credDef-table-pop-up',
  templateUrl: './credDefDetail-table-pop-up.component.html',
  styleUrls: ['./credDefDetail-table-pop-up.component.css']
})
export class TablePopUpComponent implements OnInit {
  displayedColNames = ['DI', 'credential name','reference state','show details']
  internalColNames = ['connectionAlias', 'referenceName','referenceState','button']
  displayedColSelectNames = ['All','DI', 'credential name','reference state']
  internalColSelectNames = ['all','connectionAlias','referenceName','referenceState']
  tableData:any[] = [];
  buttonFunctions:((arg0:any,arg1:any,arg2:any) => void)[] = [this.showDetailsToCredDI]
  credDef: any
  dataLoaded = false

  constructor(private thisDialogRef: MatDialogRef<TablePopUpComponent>,
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: {credDef:any, addDItoCredDef:()=>void}) {
        this.credDef = data.credDef
        this.getDIsToCredDef()
       }

  ngOnInit(): void {
  }


  getDIsToCredDef() {
    if (isDevMode()) {
      console.log('got all DIs to CredDef \"' + this.credDef.alias + "\"")
    }
    this.tableData = [{
      connectionAlias: 'Bernd',
      referenceName:'Ausweiskontrolle123',
      referenceState: 'CREDENTIAL_ISSUED'
    },
    {
      connectionAlias: 'Arnulf',
      referenceName:'Ausweiskontrolle321',
      referenceState: 'CREDENTIAL_OFFER_SENT'
    }]
    this.dataLoaded = true;
  }

  showDetailsToCredDI(idx: number,credData:any[],dialogRef:MatDialog) {
    let di = credData[idx];
    if (isDevMode()) {
      console.log('show Details to credential from DI ' + di.alias)
    }
    dialogRef.open(InformationPopUpComponent, {
      data: {
        header: 'Details to credential "' + di.referenceName + '"',
        text: "Details will be added here",
      },
    });
  }

  openAddDIWindow() {
    if (isDevMode()) {
      console.log("open AddDI window")
    }
  }

  close() {
    if (isDevMode()) console.log('close window');
    this.thisDialogRef.close();
  }

}

