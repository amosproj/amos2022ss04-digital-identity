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
    expect(component.getStatus).toBeDefined();
    let error_codes = component.defined_errors
    for (let err of error_codes) {

      component.error_code = err;

      let error_blocks : DebugElement[] = [
        de.query(By.css("error-block400")),
        de.query(By.css("error-block401")),
        de.query(By.css("error-block403")),
        de.query(By.css("error-block404")),
        de.query(By.css("error-block408")),
        de.query(By.css("error-block418")),
        de.query(By.css("error-block500")),
        de.query(By.css("error-block503"))];
      // let count : number = 0;

      for (let i = 0; i < error_blocks.length; i++) {
        if (error_blocks[i] != null) {
          // count++;
          for (let j = 0; j < error_blocks.length; j++) {
            if (j != i) {
              expect(error_blocks[j]).toBeNull();
              console.log("hello :)")
            }
          }
        }
      }
      // expect(count).toEqual(1);

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
