import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let de: DebugElement;
  let router: Router;

  let available_error_codes: number[];
  let activatedRouteStub = {
    url: of(['place', 'holder']),
  };

  beforeAll(() => {
    available_error_codes = [400, 401, 403, 404, 408, 418, 500, 503];
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'error/:errorCode', component: ErrorPageComponent },
          { path: '**', redirectTo: 'error/404' },
        ]),
      ],
      declarations: [ErrorPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);

    buildComponents();
  });

  // *********
  // *********
  // **Specs**
  // *********
  // *********

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Routing to error/<error-number> will show a correct error page and number', fakeAsync(() => {
    for (let err of available_error_codes) {
      navigateToPath(`error/${err}`);
      expectErrorPage(err);
    }
  }));

  it('Routing to error/wilderpath results in the 404 page', fakeAsync(() => {
    navigateToPath('error/wilderpath');
    expectErrorPage(404);
  }));

  it('Routing to error/<not one of our error-numbers> results in the 404 page', fakeAsync(() => {
    let test_amount = 15;
    let i = 0;
    while (i < test_amount) {
      // generate random number
      let random_number: number = Math.floor(Math.random() * 1000);
      // do not test available error codes
      if (available_error_codes.indexOf(random_number) == -1) {
        navigateToPath(`error/${random_number}`);
        expectErrorPage(404);
        i++;
      }
    }
  }));

  // ****************
  // ****************
  // **Test Helpers**
  // ****************
  // ****************

  /**
   * (re)builds fixture, component, de (DebugElement)
   * additionally executes  fixture.detectChanges()
   */
  function buildComponents() {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  }

  function expectErrorPage(expected_status: number) {
    let error_blocks: DebugElement[] = de.queryAll(By.css('.error-block'));
    expect(error_blocks.length)
      .withContext('Amount of divs of the class .error-block')
      .toBe(1);

    let error_block: DebugElement = error_blocks[0];
    let expected_id: String = `error-block${expected_status}`;
    expect(error_block.nativeElement.id)
      .withContext('Checking the id of the displayed block')
      .toEqual(expected_id);

    let error_status = de.query(By.css('.error-status')).nativeElement;
    expect(error_status.textContent)
      .withContext('Displayed error status')
      .toContain(expected_status);
  }

  function navigateToPath(path: string) {
    router.navigate([path]);
    // use tick to wait until router.navigate is finished ()
    // note: this works only in the test environment
    tick();

    // Mock ActivedRoute
    activatedRouteStub.url = of(router.url.split('/'));

    // rebuild
    buildComponents();
  }
});
