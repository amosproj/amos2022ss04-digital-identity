import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredDefOverviewPageComponent } from './credDef-overview-page.component';

describe('CredDefOverviewPageComponent', () => {
  let component: CredDefOverviewPageComponent;
  let fixture: ComponentFixture<CredDefOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredDefOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
