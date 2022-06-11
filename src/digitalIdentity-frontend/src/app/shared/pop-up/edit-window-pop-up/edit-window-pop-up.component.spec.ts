import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditWindowPopUpComponent } from './edit-window-pop-up.component';

describe('InputFieldPopUpComponent', () => {
  let component: EditWindowPopUpComponent;
  let fixture: ComponentFixture<EditWindowPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWindowPopUpComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWindowPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
