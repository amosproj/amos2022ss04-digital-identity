import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSchemaPopUpComponent } from './show-schema-pop-up.component';

describe('EditSchemaPopUpComponentComponent', () => {
  let component: ShowSchemaPopUpComponent;
  let fixture: ComponentFixture<ShowSchemaPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSchemaPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSchemaPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
