import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

import { TablePopUpComponent } from './credDefDetail-table-pop-up.component';

describe('TablePopUpComponent', () => {
  let component: TablePopUpComponent;
  let fixture: ComponentFixture<TablePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePopUpComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule],
      providers: [{provide:MatDialogRef, useValue:{}}, {provide:MAT_DIALOG_DATA, useValue:{credDef:{alias:'test'},addDItoCredDef:()=>{}}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
