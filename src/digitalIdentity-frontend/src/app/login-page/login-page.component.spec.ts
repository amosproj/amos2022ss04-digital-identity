import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show test div in devMode', () => {
    expect(component.inDevelopment).toBeDefined();
    let spy = spyOn(component, 'inDevelopment').and.returnValue(true);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.inDevelopment()).toBeTrue();

    let test_div = de.query(By.css('.test-card'));
    expect(test_div).not.toBeNull();
  });

  it('should not show test div in production', () => {
    expect(component.inDevelopment).toBeDefined();
    let spy = spyOn(component, 'inDevelopment').and.returnValue(false);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.inDevelopment()).toBeFalse();

    let test_div = de.query(By.css('.test-card'));
    expect(test_div).toBeNull();
  });
});
