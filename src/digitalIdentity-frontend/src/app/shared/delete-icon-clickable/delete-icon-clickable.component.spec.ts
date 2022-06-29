import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/components/material/material.module';

import { DeleteIconClickableComponent } from './delete-icon-clickable.component';

describe('DeleteIconClickableComponent', () => {
  let component: DeleteIconClickableComponent;
  let fixture: ComponentFixture<DeleteIconClickableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteIconClickableComponent],
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [],
    }).compileComponents();
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
