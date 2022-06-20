import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateDIPageComponent } from './createDI-page.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpParams } from '@angular/common/http';

describe('CreateDIPageComponent', () => {
  let component: CreateDIPageComponent;
  let fixture: ComponentFixture<CreateDIPageComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDIPageComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateDIPageComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDIPageComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render one button with text "Register"', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(1);
    const registerDIButton = await loader.getHarness(MatButtonHarness.with({text: 'Register'}));
    expect(registerDIButton).toBeDefined();
    expect(await registerDIButton.isDisabled()).toBe(true);
  });

  it('should properly render the register-form with placeholder data', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness);
    expect(cards.length).toBe(1);
    const registerCard = await loader.getHarness(MatCardHarness.with({selector: '.mat-card'}));
    expect(registerCard).toBeDefined();

    // TODO check for placeholder data

  });

  it('should only be valid if there are all required form fields filled in', async () => {


    // TODO not at all finished yet

    let insertedData = {
      "name": generateRandomString(8),
      "surname": generateRandomString(12),
      "email": generateRandomEmail(15)
    };

    component.formGroup.setValue(insertedData);

    expect(component.formGroup.valid).toBeTrue();

  });


  // it('should properly fetch the data from the form and add it to the parameters for the http request', async () => {


  // });


  // it('should open the information pop-up with an error message in case of an error response from the http request', async () => {


  // });

  // it('should open the information pop-up with a success message in case of a success response from the http request', async () => {


  // });


  it('should add the email address to the post parameters in lower case, case: mixed letters', () => {
    let insertedData = {
      "name": "John",
      "surname": "Doe",
      "email": "JohnExample@Doe"
    };
    let insertedDataLower = new HttpParams()
      .append("name", "John")
      .append("surname", "Doe")
      .append("email", "johnexample@doe")
      .append('authorization', 'passing');

    component.formGroup.setValue(insertedData);
    expect(component.formGroup.valid).toBeTrue();

    let spy = spyOn(component, 'registerPostRequest').and.callFake(function() {
      expect(arguments[0]).toEqual(insertedDataLower);
    });

    component.registerButtonEvent();
    expect(spy).toHaveBeenCalled();
  });

  it('should add the email address to the post parameters in lower case, case: lower letters', () => {
    let insertedData = {
      "name": "Johanna",
      "surname": "Doe",
      "email": "johannaexample@doe"
    };
    let insertedDataLower = new HttpParams()
    .append("name", "Johanna")
    .append("surname", "Doe")
    .append("email", "johannaexample@doe")
    .append('authorization', 'passing');

    component.formGroup.setValue(insertedData);
    expect(component.formGroup.valid).toBeTrue();

    let spy = spyOn(component, 'registerPostRequest').and.callFake(function() {
      expect(arguments[0]).toEqual(insertedDataLower);
    });

    component.registerButtonEvent();
    expect(spy).toHaveBeenCalled();
  });

  it('should add the email address to the post parameters in lower case, case: capital letters', () => {
    let insertedData = {
      "name": "Jonathan",
      "surname": "Example",
      "email": "JONATHANEXAMPLE@DOE.COM"
    };
    let insertedDataLower = new HttpParams()
      .append("name", "Jonathan")
      .append("surname", "Example")
      .append("email", "jonathanexample@doe.com")
      .append('authorization', 'passing');

    component.formGroup.setValue(insertedData);
    expect(component.formGroup.valid).toBeTrue();

    let spy = spyOn(component, 'registerPostRequest').and.callFake(function() {
      expect(arguments[0]).toEqual(insertedDataLower);
    });

    component.registerButtonEvent();
    expect(spy).toHaveBeenCalled();
  });

});



// random data generators

function generateRandomString(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomEmail(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  let localPart = '';
  let domainPart = '';
  let length1 = Math.floor(Math.random() * ((length - 2)) + 1);
  for (let i = 0; i < length1; i++) {
    localPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  for (let i = 0; i < (length - length1 -1); i++) {
    domainPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  result = localPart + '@' + domainPart;
  return result;
}
