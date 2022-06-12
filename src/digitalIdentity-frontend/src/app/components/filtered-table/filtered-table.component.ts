import { Component,  Input, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface filterType {
  column:string,
  filter:string,
  idx:number
}
export interface table_data {
  data: any[],
  displayedCols: string[],
  selectableCols: string[]
}


@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.css']
})
export class FilteredTableComponent implements OnInit {
  @Input() tableData:any[] = [];
  @Input() displayedCols:string[] = [];
  @Input() selectableCols:string[] = [];
  @Input() buttonFunction:((arg0:any,arg1:any) => void) = ((arg0,arg1) => {""})

  filteredTableSource:MatTableDataSource<any> = new MatTableDataSource();
  filterInput : FormGroup = new FormGroup({input: new FormControl("")})
  selectedCol: FormGroup = new FormGroup({ col: new FormControl('all') });
  appliedFilters: filterType[] = [];

  constructor(private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    this.filteredTableSource = new MatTableDataSource(this.tableData);
  }

  applyFilter(event: Event, column: string) {
    if (event.target != null) {
      this.filteredTableSource.filterPredicate = this.getFilterPredicate(column);
      const filterValue = (event.target as HTMLInputElement).value;
      this.filteredTableSource.filter = filterValue.trim().toLowerCase();
      if (filterValue.trim().toLowerCase() == "") {
        this.filteredTableSource.filter = '◬';
      }
    }
    else {
      this.filteredTableSource.filter = '◬';
    }
  }

  addFilter(event:Event,column:string) {
    let filter = (event.target as HTMLInputElement).value;
    if(filter != "" && this.appliedFilters.find(x => x.column == column && x.filter == filter) == null) {
      let idx:number = this.appliedFilters.length
      this.appliedFilters.push(<filterType>{column,filter,idx})
      this.filterInput.controls['input'].setValue("")
    }
  }

  removeFilter(idx:number) {
    if (this.appliedFilters.find(x => x.idx == idx)) {
      let oldLength = this.appliedFilters.length;
      this.appliedFilters = this.appliedFilters.filter(x => x.idx != idx);
      let removedEntries = oldLength - this.appliedFilters.length;
      if (isDevMode() && removedEntries != 1) {
        console.log("Filtered-Table: None or more than one entry was deleted");
      }
      for (let i = 0; i < this.appliedFilters.length; i++) {
        if (this.appliedFilters[i].idx > idx) {
          this.appliedFilters[i].idx -= removedEntries;
        }
      }
    }
    this.applyFilter(new Event('ng-keyup'),"all");
  }

  getFilterPredicate(column: string) {
    return (data: any, filter: string) => {
      if (!this.checkFilter(data,column,filter)) {
        return false;
      }
      else {
        for (let filter of this.appliedFilters) {
          if (!this.checkFilter(data,filter.column,filter.filter)) {
            return false;
          }
        }
      }
      return true;
    };
  }

  checkFilter(data:any, column:string, filter:string) : boolean {
    let dataStr = '';
    if (column == 'all') {
      dataStr = Object.keys(data)
      .reduce((currentTerm: string, key: string) => {
        return currentTerm + '◬'+  (data as { [key: string]: any })[key];
      }, '')
      .toLowerCase();}
    else {
      dataStr = '◬' + (data as { [key: string]: any })[column];
    }
    const filter_lowerCase = filter.trim().toLowerCase();

    return dataStr.indexOf(filter_lowerCase) != -1;
  }

  buttonEvent(rowIndex: number) {
    if (isDevMode()) {
      console.log("Button event")
    }
    this.buttonFunction(rowIndex,this.tableData);
  }

}

