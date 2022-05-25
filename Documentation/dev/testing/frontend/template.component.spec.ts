import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './myComponent.component'; // TODO: adjust 
import { DebugElement } from '@angular/core';


describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ... ], // TODO: adjust
      imports:[...] // TODO: adjust
    })
      .compileComponents(); // compiles the components html and css
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent); // fixture is the test environment for the component
    component = fixture.componentInstance; // the component itself
    de = fixture.debugElement; // the rendered component
    
    fixture.detectChanges();
  });
});
