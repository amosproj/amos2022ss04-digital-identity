import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import { EditWindowPopUpComponent } from './edit-window-pop-up.component';

describe('EditWindowPopUpComponent', () => {
  let component: EditWindowPopUpComponent;
  let fixture: ComponentFixture<EditWindowPopUpComponent>;
  let httpService : BackendHttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWindowPopUpComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        BackendHttpService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWindowPopUpComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(BackendHttpService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
