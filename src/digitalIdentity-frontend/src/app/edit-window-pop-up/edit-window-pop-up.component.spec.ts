import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWindowPopUpComponent } from './edit-window-pop-up.component';

describe('InputFieldPopUpComponent', () => {
  let component: EditWindowPopUpComponent;
  let fixture: ComponentFixture<EditWindowPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWindowPopUpComponent ]
    })
    .compileComponents();
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
