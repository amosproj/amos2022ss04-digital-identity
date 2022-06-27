import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIconClickableComponent } from './delete-icon-clickable.component';

describe('DeleteIconClickableComponent', () => {
  let component: DeleteIconClickableComponent;
  let fixture: ComponentFixture<DeleteIconClickableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteIconClickableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIconClickableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
