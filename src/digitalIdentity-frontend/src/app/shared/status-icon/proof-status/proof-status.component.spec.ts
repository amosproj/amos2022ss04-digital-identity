import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofStatusComponent } from './proof-status.component';

describe('ProofStatusComponent', () => {
  let component: ProofStatusComponent;
  let fixture: ComponentFixture<ProofStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
