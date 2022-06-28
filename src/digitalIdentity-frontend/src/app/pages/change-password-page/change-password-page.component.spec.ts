import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/components/material/material.module';

import { ChangePasswordComponent } from './change-password-page.component';
let activatedRouteStub = of({
  email: 'test@test.de',
  old_password: 'safePassword',
});
describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: activatedRouteStub },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
