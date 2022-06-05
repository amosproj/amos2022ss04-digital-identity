import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let de: DebugElement;

  let avaible_error_codes: number[];

  beforeAll(() => {
    avaible_error_codes = [400, 401, 403, 404, 408, 418, 500, 503];
  });

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
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO
  it('should render/contain only one div with the class error-block', () => {
    for (let err of avaible_error_codes) {
      // setup mockig
      component.error_code = err;
      fixture.detectChanges(); // update current component to match values

      // console.log(err, '==', component.error_code, de.queryAll(By.css('.error-block')));
      let error_blocks: DebugElement[] = de.queryAll(By.css('.error-block'));
      console.log(error_blocks.length);
      expect(error_blocks.length)
        .withContext('Amount of divs of the class .error-block')
        .toBe(1);
    }
  });

  //TODO
  it('Routing to error/<error-number> will show the correct error number', () => {
    // these should be tested with a loop [400, 401, 403, 404, 408, 418, 500, 503]
  });
  it('Routing to error/wilderpath or error/<not one of our error-numbers> result in the 404 page', () => {
    // these should be tested with a loop [400, 401, 403, 404, 408, 418, 500, 503]
  });
});
