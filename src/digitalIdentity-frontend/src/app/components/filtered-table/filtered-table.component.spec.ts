import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

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
  it ('should not add a filter if filter input is ""', async => {
    component.addFilter(new Event('ng-keyup'),'');
    expect(component.appliedFilters).withContext('count of applied filters').toBeNull();
  });

  it ('should not display anything if it is filtered by something that is not in data', async => {

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
//   component.displayedColNames = randomColNames();
//   component.tableData = randomTableData(component.displayedColNames, n);
//   // component.buttonFunctions = buttonFuncs()
}

// @Input() tableData:any[] = [];
// @Input() displayedColNames:string[] = [];
// @Input() internalColNames:string[] = [];
// @Input() selectableCols:string[] = [];
// @Input() displayedColSelectNames:string[] = [];
// @Input() dialogRef:MatDialog = <MatDialog>{}
// @Input() buttonFunctions:((arg0:any,arg1:any,arg2:any) => void)[] = [((arg0,arg1,arg2) => {""})]

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

// function randomTableData(colNames: string[] , n: number): any[] {
//   let table = []
//   for (let i = 0; i < n; i++) {
//     let entry : Object = {}
//     for (let j = 0; j < colNames.length; j++) {
//       entry.keys.push(colNames[j])
//       entry[colNames[j]] = randomInputString(inputStringMaxLength);
//       console.log(entry)
//     }
//     table.push(entry)
//   }
//   return table
// }

// function randomColNames(): string[] {
//   let randColNames = []
//   let num_cols = Math.floor((Math.random() * colsMaxCount)) + 3;
//   for (let i = 0; i < num_cols; i++) {
//     randColNames.push(randomNameString(colNameStringMaxLength))
//   }
//   return randColNames
// }
// function buttonFuncs() {
//   return [(arg0:any,arg1:any,arg2:any) => {}]
// }
// function randomNameString(length: number) {
//   const characters = 'abcdefghijklmnopqrstuvwxyz';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

// function randomInputString(length: number) {
//   const characters = 'abcdefghijklmnopqrstuvwxyz0123456789@.';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }
