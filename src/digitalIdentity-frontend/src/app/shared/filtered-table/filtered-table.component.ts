import { Component, Input, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

export interface filterType {
  column: string;
  filter: string;
  idx: number;
}

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.css'],
})
export class FilteredTableComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() displayedColNames: string[] = [];
  @Input() internalColNames: string[] = [];
  @Input() displayedColSelectNames: string[] = [];
  @Input() internalColSelectNames: string[] = [];
  @Input() dialogRef: MatDialog = <MatDialog>{};
  @Input() buttonFunctions: ((arg0: any, arg1: any, arg2: any) => void)[] = [
    (arg0, arg1, arg2) => {
      ('');
    },
  ];

  // delete properties
  @Input() deleteRequest: (arg0: any, arg1: any) => void = (arg0, arg1) => {};
  @Input() deleteProperties = {
    header: 'Delete file',
    text: 'Are you sure to delete this file?',
  };

  filteredTableSource: MatTableDataSource<any> = new MatTableDataSource();
  filterInput: FormGroup = new FormGroup({ input: new FormControl('') });
  selectedCol: FormGroup = new FormGroup({ col: new FormControl('all') });
  appliedFilters: filterType[] = [];

  constructor() {
    this.filteredTableSource = new MatTableDataSource(this.tableData);
  }

  ngOnInit(): void {
    this.loadDataInMatTable(this.tableData);
  }

  loadDataInMatTable(tableData: any[]) {
    this.filteredTableSource = new MatTableDataSource(tableData);
  }

  applyFilterEvent(event: Event, column: string) {
    let filter = '';
    if (event.target != null) {
      filter = (event.target as HTMLInputElement).value;
    }
    this.applyFilter(filter, column);
  }

  applyFilter(filterValue: string, column: string) {
    this.filteredTableSource.filterPredicate = this.getFilterPredicate(column);
    if (filterValue != '') {
      this.filteredTableSource.filter = filterValue.trim().toLowerCase();
      if (this.filteredTableSource.filter == '') {
        this.filteredTableSource.filter = '◬';
      }
    } else {
      this.filteredTableSource.filter = '◬';
    }
    this.filteredTableSource.filterPredicate = this.getFilterPredicate(column);
  }

  addFilterEvent(event: Event, column: string) {
    let filter = '';
    if (event.target != null) {
      filter = (event.target as HTMLInputElement).value;
    }
    this.addFilter(filter, column);
  }

  addFilter(filter: string, column: string) {
    this.filteredTableSource.filterPredicate = this.getFilterPredicate(column);
    if (
      filter != '' &&
      this.appliedFilters.find(
        (x) => x.column == column && x.filter == filter
      ) == null
    ) {
      let idx: number = this.appliedFilters.length;
      this.appliedFilters.push(<filterType>{ column, filter, idx });
      this.filterInput.controls['input'].setValue('');
    }
    this.applyFilter(this.filterInput.value['input'], 'all');
  }

  removeFilter(idx: number) {
    if (this.appliedFilters.find((x) => x.idx == idx)) {
      let oldLength = this.appliedFilters.length;
      this.appliedFilters = this.appliedFilters.filter((x) => x.idx != idx);
      let removedEntries = oldLength - this.appliedFilters.length;
      if (isDevMode() && removedEntries != 1) {
        console.log('Filtered-Table: None or more than one entry was deleted');
      }
      for (let i = 0; i < this.appliedFilters.length; i++) {
        if (this.appliedFilters[i].idx > idx) {
          this.appliedFilters[i].idx -= removedEntries;
        }
      }
    }
    this.applyFilter(this.filterInput.value['input'], 'all');
  }

  getFilterPredicate(column: string) {
    return (data: any, filter: string) => {
      if (!this.checkFilter(data, column, filter)) {
        return false;
      } else {
        for (let filter of this.appliedFilters) {
          if (!this.checkFilter(data, filter.column, filter.filter)) {
            return false;
          }
        }
      }
      return true;
    };
  }

  checkFilter(data: any, column: string, filter: string): boolean {
    let dataStr = '';
    if (column == 'all') {
      dataStr = Object.keys(data)
        .reduce((currentTerm: string, key: string) => {
          if (this.internalColSelectNames.find((x) => key == x)) {
            if (key == 'active') {
              let tmp: string = (data as { [key: string]: any })[key]
                ? 'active'
                : 'inactive';
              return currentTerm + '◬' + tmp;
            } else {
              return (
                currentTerm +
                '◬' +
                (data as { [key: string]: any })[key].toString()
              );
            }
          } else {
            return currentTerm;
          }
        }, '')
        .toLowerCase();
    } else {
      if (column == 'active') {
        let tmp: string = (data as { [key: string]: any })[column]
          ? 'active'
          : 'inactive';
        dataStr = '◬' + tmp;
      } else {
        dataStr =
          '◬' +
          (data as { [key: string]: any })[column].toString().toLowerCase();
      }
    }
    const filter_lowerCase = filter.trim().toLowerCase();

    return dataStr.indexOf(filter_lowerCase) != -1;
  }

  buttonEvent(rowIndex: number, colIndex: number) {
    // prettier-ignore
    if (colIndex < this.internalColNames.length && this.internalColNames[colIndex] == 'button') {
      if (isDevMode()) {
        console.log('Button event');
        console.log(this.buttonFunctions)
      }
      this.buttonFunctions[
        colIndex - this.internalColNames.filter((x) => x != 'button').length
      ](rowIndex, this.tableData, this.dialogRef);
    }
  }

  openDeleteDialog(row: number) {
    this.dialogRef.open(DeleteDialogComponent, {
      data: {
        header: this.deleteProperties.header,
        text: this.deleteProperties.text,
        id: this.tableData[row].id,
        connectionId: this.tableData[row].connectionId,
        deleteRequest: this.deleteRequest,
      },
    });
  }
}
