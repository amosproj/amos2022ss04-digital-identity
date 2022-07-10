import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLinkedAttributesComponent } from './auto-linked-attributes.component';

describe('AutoLinkedAttributesTableComponent', () => {
  let component: AutoLinkedAttributesComponent;
  let fixture: ComponentFixture<AutoLinkedAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoLinkedAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoLinkedAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
