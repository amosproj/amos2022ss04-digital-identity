import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../components/material/material.module';

import { FilteredTableComponent } from './filtered-table.component';
import { MatTableHarness } from '@angular/material/table/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

let inputStringMaxLength = 10;
let colNameStringMaxLength = 10;
let colsMaxCount = 7;

describe('FilteredTableComponent', () => {
  let component: FilteredTableComponent;
  let fixture: ComponentFixture<FilteredTableComponent>;
  let loader: HarnessLoader;
  let n: number;
  let data: any[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredTableComponent ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredTableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

    // generate dummy data and load it
    n = 5;

    initComponent(component);
    component.ngOnInit();
    console.log('used random tableData:', data);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a table with the right headers', async () => {
    const expectedHeadings = testData().colNames;
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);

    const headerRows = await table.getHeaderRows();
    expect(await headerRows[0].getCellTextByIndex()).toEqual(expectedHeadings);
  });

  it('should properly render data after loading the data', async () => {
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    const rows = await table.getRows();
    expect(rows.length).withContext('number of rows').toBe(n);
    data = testData().data;

    for (let i = 0; i < n; i++) {
      let expected = data[i];
      let actual = await rows[i];
      let actual_column = await actual.getCellTextByColumnName();
      console.log(i, '-th row:', actual);
      console.log(i, '-th row text:', actual_column);

      expect(actual_column['name'])
        .withContext('row ' + i + ' celltext name')
        .toEqual(expected.name.toString());
      expect(actual_column['version'])
        .withContext('row ' + i + ' celltext version')
        .toEqual(expected.version.toString());
      expect(actual_column['ruezlpfrmpfUndSoHaltEinLangerName'])
        .withContext('row ' + i + ' celltext ruezlpfrmpfUndSoHaltEinLangerName')
        .toEqual(expected.ruezlpfrmpfUndSoHaltEinLangerName.toString());
      expect(actual_column['email'])
        .withContext('row ' + i + ' celltext email')
        .toEqual(expected.email.toString());
      expect(actual_column['IstDasSinnvoll'])
        .withContext('row ' + i + ' celltext IstDasSinnvoll')
        .toEqual(expected.IstDasSinnvoll.toString());
    }
  });

  it ('should execute the buttonFunction when the buttonFunction is called and it is in the array', async () => {
    var spyLog = spyOn(console, 'log').and.callThrough();
    spyLog.calls.reset();
    await component.internalColNames.push('button');
    component.buttonFunctions.push((arg0:any,arg1:any,arg2:any) => {console.log('hello world!');});
    component.buttonEvent(0,component.internalColNames.length - 1);
    expect(spyLog).toHaveBeenCalled();
  })

  it ('should not execute if colIndex is out of bounds or if at the position is no button', async () => {
    var spyLog = spyOn(console, 'log').and.callThrough();
    spyLog.calls.reset();
    component.internalColNames.push('button')
    component.buttonFunctions.push((arg0:any,arg1:any,arg2:any)=>{console.log('hello world!')})
    var spyButton = spyOn(component,'buttonEvent');
    component.buttonEvent(0,component.internalColNames.length + 1);
    expect(spyButton).toHaveBeenCalled();
    expect(spyLog).not.toHaveBeenCalled();

    spyButton.calls.reset();
    spyLog.calls.reset();
    component.buttonEvent(0,0);
    expect(spyButton).toHaveBeenCalled();
    expect(spyLog).not.toHaveBeenCalled();
  })

  it ('should not add a filter if filter input is ""', async () => {
    component.addFilter("",'all')
    expect(component.appliedFilters.length).withContext('count of applied filters').toEqual(0);
  });

  it ('should not display anything if it is filtered by something that is not in data', async () => {
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    component.addFilter("~#dahcädjaw21",'all');
    expect(component.appliedFilters.length).withContext('count of applied filters').toEqual(1);
    expect(component.filterInput.value['input']).toEqual('')
    fixture.detectChanges();
    const rows = await table.getRows();
    expect(rows.length).withContext('rows in table').toEqual(0);
  });

  it ('should display all rows if filter ist removed', async () => {
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    component.addFilter("~#dahcädjaw21",'all');
    expect(component.appliedFilters.length).withContext('count of applied filters').toEqual(1);
    component.removeFilter(0);
    expect(component.appliedFilters.length).withContext('count of applied filters').toEqual(0);
    fixture.detectChanges();
    const rows = await table.getRows();
    expect(rows.length).withContext('rows in table').toEqual(5);
  });

});
function initComponent(component : FilteredTableComponent){
  let data = testData();
  component.displayedColNames = data.colNames;
  component.internalColNames = data.colNames;

  let selectableCols = ['all'];
  data.colNames.forEach((x) => selectableCols.push(x));
  component.displayedColSelectNames = selectableCols;
  component.internalColSelectNames = selectableCols;

  component.tableData = data.data;
}



function testData() {
  return {
    colNames:['name','version','ruezlpfrmpfUndSoHaltEinLangerName','email','IstDasSinnvoll'],
    data:[{
    name:"Test",
    version:2.0,
    ruezlpfrmpfUndSoHaltEinLangerName:"Und dazu ein langer Input und so alles voll toll",
    email:"info@test.email.de",
    IstDasSinnvoll:true
  },
  {
    name:"Test2",
    version:15.0,
    ruezlpfrmpfUndSoHaltEinLangerName:"Und dazu ein langer Input und so alles voll toll dasddsa",
    email:"info@email.de",
    IstDasSinnvoll:false
  },
  {
    name:"Test3",
    version:0.0,
    ruezlpfrmpfUndSoHaltEinLangerName:"Und dazu ein langer Input und so alles voll toll dasdsadwadwa",
    email:"undAuchHierWasLaengeres@malAusprobieren.de",
    IstDasSinnvoll:true
  },
  {
    name:"Test3",
    version:0.0,
    ruezlpfrmpfUndSoHaltEinLangerName:"Und dazu ein langer Input und so alles voll toll dasdsadwadwa",
    email:"undAuchHierWasLaengeres@malAusprobieren.de",
    IstDasSinnvoll:true
  },
  {
    name:"Test3",
    version:0.0,
    ruezlpfrmpfUndSoHaltEinLangerName:"Und dazu ein langer Input und so alles voll toll dasdsadwadwa",
    email:"undAuchHierWasLaengeres@malAusprobieren.de",
    IstDasSinnvoll:true
  }
]}
}
