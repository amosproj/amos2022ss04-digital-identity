import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ErrorPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO
  it('should render/contain only one div with the class error-block', () => {});
  //TODO
  it('Routing to error/400 will show the correct error number', () => {
    // these should be tested with a loop [400, 401, 403, 404, 408, 418, 500, 503]
  });
  it('Routing to error/wilderpath or error/111 result in the 404 page', () => {
    // these should be tested with a loop [400, 401, 403, 404, 408, 418, 500, 503]
  });
});
