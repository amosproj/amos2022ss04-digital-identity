import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiDetailPopUpComponent } from './di-detail-pop-up.component';

describe('DiDetailPopUpComponent', () => {
  let component: DiDetailPopUpComponent;
  let fixture: ComponentFixture<DiDetailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiDetailPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
