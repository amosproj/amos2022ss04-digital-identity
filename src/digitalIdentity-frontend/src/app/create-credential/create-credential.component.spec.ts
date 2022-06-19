import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCredentialComponent } from './create-credential.component';

describe('CreateCredentialComponent', () => {
  let component: CreateCredentialComponent;
  let fixture: ComponentFixture<CreateCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
