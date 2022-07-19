import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import { CredDefOverviewPageComponent } from './credDef-overview-page.component';

describe('CredDefOverviewPageComponent', () => {
  let component: CredDefOverviewPageComponent;
  let fixture: ComponentFixture<CredDefOverviewPageComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredDefOverviewPageComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: BackendHttpService,
          useValue: {
            getRequest: (arg0: any, arg1: any, arg2: any) => {
              return new Promise<any>(function (resolve, reject) {
                return new HttpResponse({
                  body: testData,
                  headers: new HttpHeaders().append(
                    'Content-Type',
                    'application/json'
                  ),
                  status: 200,
                  statusText: 'OK',
                  url: '',
                });
              });
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredDefOverviewPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have displayed and internal columns of equal length', () => {
    expect(component.displayedColSelectNames.length)
      .withContext('displayedColSelectNames')
      .toEqual(component.internalColSelectNames.length);
    expect(component.displayedColumnNames.length)
      .withContext('displayedColNames')
      .toEqual(component.internalColumnNames.length);
  });

  it('should init table properly when HttpService sends data', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: testData,
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 200,
              statusText: 'OK',
              url: '',
            })
          );
        });
      }
    );
    await component.initTable();
    expect(component.dataLoaded).toBeTrue();
    expect(component.credDefData).not.toBe([]);
  });

  it('should not be initialized when HttpService returns error', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          reject(
            new HttpResponse({
              body: 'Error',
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 500,
              statusText: 'Internal Server Error',
              url: '',
            })
          );
        });
      }
    );
    await component.initTable();

    expect(component.dataLoaded).toBeFalse();
    expect(component.credDefData).toEqual([]);
  });

  it('should be empty when valid http call returns empty array', async () => {
    let spyGetRequest = spyOn(component.httpService, 'getRequest').and.callFake(
      () => {
        return new Promise<any>(function (resolve, reject) {
          resolve(
            new HttpResponse({
              body: [],
              headers: new HttpHeaders().append(
                'Content-Type',
                'application/json'
              ),
              status: 200,
              statusText: 'Internal Server Error',
              url: '',
            })
          );
        });
      }
    );
    await component.initTable();
    expect(component.credDefData).toEqual([]);
    expect(component.dataLoaded).toBeTrue();
  });

  it('should open credDefPopUp with correct data when openCredDefPopUp is called', async () => {
    component.credDefData = <any>testData;
    expect(component.credDefData.length).toBeGreaterThan(0);
    var spy = spyOn(component.dialogRef, 'open');
    for (let row = 0; row < component.credDefData.length; row++) {
      spy.calls.reset();
      component.openCredDefExpandedWindow(
        row,
        component.credDefData,
        component.dialogRef
      );
      expect(spy).toHaveBeenCalled();

      let args = spy.calls.mostRecent().args;
      expect(args.length).toBe(2);
      expect(args[1]?.data).toBeDefined();

      let matData = <{ credDef: any }>args[1]?.data;
      let credDef = matData.credDef;

      expect(credDef).toEqual((<any[]>component.credDefData)[row]);
    }
  });

  let testData = [
    {
      alias: 'credDef1',
      active: false,
    },
    {
      alias: 'credDef2',
      active: true,
    },
    {
      alias: 'credDef3',
      active: true,
    },
    {
      alias: 'credDef4',
      active: false,
    },
  ];
});
