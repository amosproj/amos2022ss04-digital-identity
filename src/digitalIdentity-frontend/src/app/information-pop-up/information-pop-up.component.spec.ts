import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
// ignore
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { InformationPopUpComponent } from './information-pop-up.component';

describe('InformationPopUpComponent', () => {
  let component: InformationPopUpComponent;
  let fixture: ComponentFixture<InformationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationPopUpComponent],
      imports: [MatDialogModule,HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
