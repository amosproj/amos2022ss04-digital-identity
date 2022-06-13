import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateDIPageComponent } from './createDI-page.component';

describe('CreateDIPageComponent', () => {
  let component: CreateDIPageComponent;
  let fixture: ComponentFixture<CreateDIPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDIPageComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDIPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should properly render the register-form with placeholder data', async () => {


  })


  it('should properly fetch the data from the form and add it to the parameters for the http request', async () => {


  })


  it('should open the information pop-up with an error message in case of an error response from the http request', async () => {


  })

  it('should open the information pop-up with a success message in case of a success response from the http request', async () => {


  })


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


});
