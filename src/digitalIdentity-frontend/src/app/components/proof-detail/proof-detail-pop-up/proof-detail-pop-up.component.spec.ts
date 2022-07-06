import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofDetailPopUpComponent } from './proof-detail-pop-up.component';

describe('ProofDetailPopUpComponent', () => {
  let component: ProofDetailPopUpComponent;
  let fixture: ComponentFixture<ProofDetailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofDetailPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
