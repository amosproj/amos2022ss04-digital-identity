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
    expect(component.displayedColSelectNames.length).withContext('displayedColSelectNames').toEqual(component.internalColSelectNames.length)
    expect(component.displayedColNames.length).withContext('displayedColNames').toEqual(component.internalColNames.length)
  });

  it ('should init table properly when HttpService sends data', async () => {
    let spyGetRequest = spyOn(component.httpService,'getRequest').and.callFake( () => {
      return new Promise<any>(function(resolve, reject) {
        resolve(new HttpResponse({body:testData,headers:new HttpHeaders().append('Content-Type', 'application/json'),status:200,statusText:'OK',url:''}))
        })}
    );
    await component.initTable();
    expect(component.dataLoaded).toBeTrue();
    expect(component.schemaData).not.toBe([]);
  })

  it ('should not be initialized when HttpService returns error', async () => {
    let spyGetRequest = spyOn(component.httpService,'getRequest').and.callFake( () => {
      return new Promise<any>(function(resolve, reject) {
        reject(new HttpResponse({body:"Error",headers:new HttpHeaders().append('Content-Type', 'application/json'),status:500,statusText:'Internal Server Error',url:''}))
        })}
    );
    await component.initTable();

    expect(component.dataLoaded).toBeFalse();
    expect(component.schemaData).toEqual([])
  })

  it ('should be empty when valid http call returns empty array', async () => {
    let spyGetRequest = spyOn(component.httpService,'getRequest').and.callFake( () => {
      return new Promise<any>(function(resolve, reject) {
        resolve(new HttpResponse({body:[],headers:new HttpHeaders().append('Content-Type', 'application/json'),status:200,statusText:'Internal Server Error',url:''}))
      })})
    await component.initTable();
    expect(component.schemaData).toEqual([]);
    expect(component.dataLoaded).toBeTrue();
  });

  it ('should open schemaDialog with correct data when openShowSchemaDialog is called', async () => {
    component.schemaData = <any>testData;
    expect(component.schemaData.length).toBeGreaterThan(0);
    var spy = spyOn(component.dialogRef, 'open');
    for (let row = 0; row < component.schemaData.length; row++) {
      spy.calls.reset();
      component.openShowSchemaDialog(row,component.schemaData,component.dialogRef)
      expect(spy).toHaveBeenCalled();

      let args = spy.calls.mostRecent().args;
      expect(args.length).toBe(2);
      expect(args[1]?.data).toBeDefined();

      let matData = <{ header: string, text:string }>args[1]?.data;
      let header = matData.header;
      let text = matData.text;

      let headerExpected = 'Details to schema "' + testData[row].alias + '"';
      let textExpected =
        'Name: ' +
        testData[row].alias +
        '\n' +
        'imageUri: ' +
        testData[row].imageUri +
        '\n' +
        'Version: ' +
        testData[row].version +
        '\n' +
        'Other attributes: ';
      for (let attr of testData[row].attributes) {
        textExpected = textExpected + '\n' + attr;
      }
      expect(header).toEqual(headerExpected);
      expect(text).toEqual(textExpected);
    }
  });

  let testData : any[] = [
    {
     alias:"TestSchema",
     imageUri:"/djal/dhladhw/dhalw",
     version:"2.1",
     attributes:[
      {
        name:'test',
        type:'string'
      }
    ]
    },
    {
      alias:"TestSchema23",
      imageUri:"/djal/dhladhw/dhalw",
      version:"2.0",
      attributes:[
       {
         name:'test',
         type:'number'
       }
     ]
     },
     {
      alias:"TestSchema029",
      imageUri:"/djal/dhladhw/dhalw",
      version:"1.9",
      attributes:[
       {
         name:'value',
         type:'date'
       }
     ]
     }]
});
