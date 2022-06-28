import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/components/material/material.module';

import { CredDefOverviewPageComponent } from './credDef-overview-page.component';

describe('CredDefOverviewPageComponent', () => {
  let component: CredDefOverviewPageComponent;
  let fixture: ComponentFixture<CredDefOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredDefOverviewPageComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
