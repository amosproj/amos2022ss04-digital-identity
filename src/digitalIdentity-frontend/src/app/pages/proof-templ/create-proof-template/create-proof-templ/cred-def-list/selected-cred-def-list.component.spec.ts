import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCredDefListComponent } from './selected-cred-def-list.component';

describe('SelectedCredDefListComponent', () => {
  let component: SelectedCredDefListComponent;
  let fixture: ComponentFixture<SelectedCredDefListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCredDefListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCredDefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
