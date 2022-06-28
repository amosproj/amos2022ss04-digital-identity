import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/components/material/material.module';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

import { SchemaOverviewComponent } from './schema-overview-page.component';

describe('SchemaOverviewComponent', () => {
  let component: SchemaOverviewComponent;
  let fixture: ComponentFixture<SchemaOverviewComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaOverviewComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: BackendHttpService, useValue: { getRequest: (arg0:any, arg1:any, arg2:any) => {return new Promise<any>(function(resolve, reject) {
          return new HttpResponse({body:testData,headers:new HttpHeaders().append('Content-Type', 'application/json'),status:200,statusText:'OK',url:''})})}} }
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have displayed and internal columns of equal length', () => {
    expect(component.displayedColSelectNames.length).withContext('displayedColSelectNames').toEqual(component.selectableCols.length)
    expect(component.displayedColumnNames.length).withContext('displayedColNames').toEqual(component.internalColumnNames.length)
  });

  it ('should init table properly when HttpService sends data', async () => {
    let spyGetRequest = spyOn(component.httpService,'getRequest').and.callFake( () => {
      return new Promise<any>(function(resolve, reject) {
        resolve(new HttpResponse({body:testData,headers:new HttpHeaders().append('Content-Type', 'application/json'),status:200,statusText:'OK',url:''}))
        })}
    );
    await component.initTable();
    expect(component.dataLoaded).toBeTrue();
    expect(component.proofData).not.toBe([]);
  })

  it ('should not be initialized when HttpService returns error', async () => {
    let spyGetRequest = spyOn(component.httpService,'getRequest').and.callFake( () => {
      return new Promise<any>(function(resolve, reject) {
        reject(new HttpResponse({body:"Error",headers:new HttpHeaders().append('Content-Type', 'application/json'),status:500,statusText:'Internal Server Error',url:''}))
        })}
    );
    await component.initTable();

    expect(component.dataLoaded).toBeFalse();
    expect(component.proofData).toEqual([])
  })

  it ('should be empty when valid http call returns empty array', async () => {
    let spyGetRequest = spyOn(component.httpService,'getRequest').and.callFake( () => {
      return new Promise<any>(function(resolve, reject) {
        resolve(new HttpResponse({body:[],headers:new HttpHeaders().append('Content-Type', 'application/json'),status:200,statusText:'Internal Server Error',url:''}))
      })})
    await component.initTable();
    expect(component.proofData).toEqual([]);
    expect(component.dataLoaded).toBeTrue();
  });

  it ('should open proofDialog with correct data when openShowProofDialog is called', async () => {
    component.proofData = <any>testData;
    expect(component.proofData.length).toBeGreaterThan(0);
    var spy = spyOn(component.dialogRef, 'open');
    for (let row = 0; row < component.proofData.length; row++) {
      spy.calls.reset();
      component.openShowProofDialog(row,component.proofData,component.dialogRef)
      expect(spy).toHaveBeenCalled();

      let args = spy.calls.mostRecent().args;
      expect(args.length).toBe(2);
      expect(args[1]?.data).toBeDefined();

      let matData = <{ header: string, text:string }>args[1]?.data;
      let header = matData.header;
      let text = matData.text;

      let headerExpected = 'Details to proof "' + testData[row].name + '"';
      let textExpected =
      'Name: ' +
      testData[row].name +
      '\n';
      expect(header).toEqual(headerExpected);
      expect(text).toEqual(textExpected);
    }
  });

  let testData = [
    {
      active: true,
      name: "Ausweiskontrolle",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      timestamp: "2022-04-21T07:14:52.347780Z",
      version: "1.00",
      requestedAttributes:{"GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys":{attributesNames:[{ attributeName: "Name" },{ attributeName: "Wohnort" }]}}
    },
    {
      active: true,
      name: "Ausweiskontrolle23",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      timestamp: "2022-04-21T07:14:52.347780Z",
      version: "2.00",
      requestedAttributes:{"GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys":{attributesNames:[{ attributeName: "Name" },{ attributeName: "Wohnort" }]}}
    },
    {
      active: true,
      name: "Ausweiskontrolle432",
      templateId: "c06718a9-8866-456f-99cc-8e6b504048d3",
      timestamp: "2022-04-21T07:14:52.347780Z",
      version: "3.00",
      requestedAttributes:{"GCevMyEWCa5Fd58gfzkASy:3:CL:8768:Mitarbeiter Ausweis Adorsys":{attributesNames:[{ attributeName: "Name" },{ attributeName: "Wohnort" }]}}
    }]
});
