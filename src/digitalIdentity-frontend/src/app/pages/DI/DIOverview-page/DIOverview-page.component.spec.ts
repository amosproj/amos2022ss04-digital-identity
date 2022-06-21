import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
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
import { provideRoutes } from '@angular/router';

describe('DIOverviewComponent', () => {
  let component: DIOverviewComponent;
  let fixture: ComponentFixture<DIOverviewComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DIOverviewComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        // { provide: MatDialog, useValue: {} },
        [BackendHttpService]
        // { provide: BackendHttpService, useValue: {getRequest: () => {return new Promise<any>(function(resolve, reject) {
        //   return new HttpResponse({body:"Error",headers:new HttpHeaders().append('Content-Type', 'application/json'),status:500,statusText:'Internal Server Error',url:''})})}} },
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

  it ('should init table properly when HttpService sends data', async () => {
    await inject([BackendHttpService], () => {getRequest: () => {return new Promise<any>(function(resolve, reject) {
      return new HttpResponse({body:testData,headers:new HttpHeaders().append('Content-Type', 'application/json'),status:200,statusText:'OK',url:''})})}});
    await component.initTable();
    expect(component.dataLoaded).toBeTruthy();
    expect(component.DIData).not.toBe([]);
  })

  it ('should not be initialized when HttpService returns error', async () => {
    await inject([BackendHttpService], () => {getRequest: () => {return new Promise<any>(function(resolve, reject) {
      return new HttpResponse({body:"Error",headers:new HttpHeaders().append('Content-Type', 'application/json'),status:500,statusText:'Internal Server Error',url:''})})}})
    let spyInit = spyOn(component,'initTable');
    await component.initTable();
    expect(spyInit).toHaveBeenCalled();
    expect(component.DIData).toEqual([])
  })

  it ('should have displayed and internal columns of equal length', () => {
    expect(component.displayedColSelectNames.length).withContext('displayedColSelectNames').toEqual(component.selectableCols.length)
    expect(component.displayedColumnNames.length).withContext('displayedColSelectNames').toEqual(component.internalColumnNames.length)
  })

  it ('should be empty when valid http call returns empty array', () => {

  })

  it ('should open editWindow with correct id when openEditWindowDialog is called', async () => {
    component.DIData = <any>testData;
    expect(component.DIData.length).toBeGreaterThan(0);
    var spy = spyOn(component.dialogRef, 'open');
    for (let row = 0; row < component.DIData.length; row++) {
      spy.calls.reset();
      component.openEditWindowDialog(row,component.DIData,component.dialogRef)
      expect(spy).toHaveBeenCalled();

      let args = spy.calls.mostRecent().args;
      expect(args.length).toBe(2);
      expect(args[1]?.data).toBeDefined();

      let matData = <{ id: string }>args[1]?.data;
      let id = matData.id;

      expect(id).toEqual((<any[]>component.DIData)[row].id);
    }
  })

  let testData : any[] = [{
    connectionId: "f116e516-771e-4e3d-8d26-c742a0206e9d",​​
    email: "valentin.braeutigam@gmail.com",​
    id: 64,​
    invitationUrl: "didcomm://aries_connection_invitation?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiMTU4ZWRkNjctZTIxNS00ZWViLTg4ODktMDNiZjk0ZTg1YWMwIiwgImxhYmVsIjogIkFkb3JzeXMiLCAiaW1hZ2VVcmwiOiAiaHR0cHM6Ly9yb3V0aW5nLmxpc3NpLmlvL2FwaS9JbWFnZS9saXNzaUxvZ28iLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vb25ib2FyZGluZ2FkLmRkbnMubmV0L2RpZGNvbW0vIiwgInJlY2lwaWVudEtleXMiOiBbIjlSRDRQUkMyZGhCRDJQV2dyNEJqdjQzVUszY0p2UzNTWE5KZGJBcUhETldKIl19",
​    name: "Testuser",
​​    surname: "Testy"
  },
  {
    connectionId: "f116e516-771e-4e3d-8d26-c742a0206e9d",​​
    email: "valentin.braeutigam@gmail.com",​
    id: 64,​
    invitationUrl: "didcomm://aries_connection_invitation?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiMTU4ZWRkNjctZTIxNS00ZWViLTg4ODktMDNiZjk0ZTg1YWMwIiwgImxhYmVsIjogIkFkb3JzeXMiLCAiaW1hZ2VVcmwiOiAiaHR0cHM6Ly9yb3V0aW5nLmxpc3NpLmlvL2FwaS9JbWFnZS9saXNzaUxvZ28iLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vb25ib2FyZGluZ2FkLmRkbnMubmV0L2RpZGNvbW0vIiwgInJlY2lwaWVudEtleXMiOiBbIjlSRDRQUkMyZGhCRDJQV2dyNEJqdjQzVUszY0p2UzNTWE5KZGJBcUhETldKIl19",
​    name: "Testuser2",
​​    surname: "Testy"
  },
  {
    connectionId: "f116e516-771e-4e3d-8d26-c742a0206e9d",​​
    email: "valentin.braeutigam@gmail.com",​
    id: 64,​
    invitationUrl: "didcomm://aries_connection_invitation?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiMTU4ZWRkNjctZTIxNS00ZWViLTg4ODktMDNiZjk0ZTg1YWMwIiwgImxhYmVsIjogIkFkb3JzeXMiLCAiaW1hZ2VVcmwiOiAiaHR0cHM6Ly9yb3V0aW5nLmxpc3NpLmlvL2FwaS9JbWFnZS9saXNzaUxvZ28iLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vb25ib2FyZGluZ2FkLmRkbnMubmV0L2RpZGNvbW0vIiwgInJlY2lwaWVudEtleXMiOiBbIjlSRDRQUkMyZGhCRDJQV2dyNEJqdjQzVUszY0p2UzNTWE5KZGJBcUhETldKIl19",
​    name: "Testuser3",
​​    surname: "Testy"
  },
  {
    connectionId: "f116e516-771e-4e3d-8d26-c742a0206e9d",​​
    email: "valentin.braeutigam@gmail.com",​
    id: 64,​
    invitationUrl: "didcomm://aries_connection_invitation?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiMTU4ZWRkNjctZTIxNS00ZWViLTg4ODktMDNiZjk0ZTg1YWMwIiwgImxhYmVsIjogIkFkb3JzeXMiLCAiaW1hZ2VVcmwiOiAiaHR0cHM6Ly9yb3V0aW5nLmxpc3NpLmlvL2FwaS9JbWFnZS9saXNzaUxvZ28iLCAic2VydmljZUVuZHBvaW50IjogImh0dHBzOi8vb25ib2FyZGluZ2FkLmRkbnMubmV0L2RpZGNvbW0vIiwgInJlY2lwaWVudEtleXMiOiBbIjlSRDRQUkMyZGhCRDJQV2dyNEJqdjQzVUszY0p2UzNTWE5KZGJBcUhETldKIl19",
​    name: "Testuser4",
​​    surname: "Testy"
  }]
});
