import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

import { CredDefDetailTablePopUpComponent } from './credDefDetail-table-pop-up.component';

describe('CredDefDetail-TablePopUpComponent', () => {
  let component: CredDefDetailTablePopUpComponent;
  let fixture: ComponentFixture<CredDefDetailTablePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredDefDetailTablePopUpComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {credDef:{alias:'test',imageUri:'',revocable:false, schemaId:''}} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefDetailTablePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have displayed and internal columns of equal length', () => {
    expect(component.displayedColSelectNames.length).withContext('displayedColSelectNames').toEqual(component.internalColSelectNames.length)
    expect(component.displayedColNames.length).withContext('displayedColNames').toEqual(component.internalColNames.length)
  });

  it ('should open detailsToCred with correct data when showDetailsToCred is called', async () => {
    component.tableData = <any>testData;
    expect(component.tableData.length).toBeGreaterThan(0);
    var spy = spyOn(component.dialogRef, 'open');
    for (let row = 0; row < component.tableData.length; row++) {
      spy.calls.reset();
      component.showDetailsToCred(row,component.tableData,component.dialogRef)
      expect(spy).toHaveBeenCalled();

      let args = spy.calls.mostRecent().args;
      expect(args.length).toBe(2);
      expect(args[1]?.data).toBeDefined();

      let matData = <{ header: string, text: string }>args[1]?.data;
      let header = matData.header;
      let text = matData.text;

      expect(header).toBeTruthy();
      expect(text).toBeTruthy();

      expect(header).not.toEqual("");
      expect(text).not.toEqual("");
    }
  });

  let testData = [{
    connectionAlias: 'Bernd',
    referenceName:'Ausweiskontrolle123',
    referenceState: 'CREDENTIAL_ISSUED'
  },
  {
    connectionAlias: 'Arnulf',
    referenceName:'Ausweiskontrolle321',
    referenceState: 'CREDENTIAL_OFFER_SENT'
  }]
});
