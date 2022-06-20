import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DIOverviewComponent } from './DIOverview-page.component';
import { DebugElement, isDevMode } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BackendHttpService } from '../../../services/backend-http-service/backend-http-service.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { MaterialModule } from '../../../components/material/material.module'
import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';

describe('DIOverviewComponent', () => {
  let component: DIOverviewComponent;
  let fixture: ComponentFixture<DIOverviewComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DIOverviewComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: BackendHttpService, useValue: {getRequest: () => {return new Promise<any>(function(resolve, reject) {
          return new HttpResponse({body:"Error",headers:new HttpHeaders().append('Content-Type', 'application/json'),status:400,statusText:'OK',url:''})})}} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DIOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should init table properly when HttpService sends data', () => {
    component.initTable();
  })

  it ('should return error message when HttpService returns error', () => {
    TestBed.overrideProvider(BackendHttpService,{useValue:{}})
    component.initTable();
    if (isDevMode()) {
      expect()
    }
  })

  it ('should open editWindow with correct id when openEditWindowDialog is called', () => {

  })

  it ('apply filter?', () => {

  })
  /*
    - check if editWindow opens
    - apply filter?
    - init table
  */
});
