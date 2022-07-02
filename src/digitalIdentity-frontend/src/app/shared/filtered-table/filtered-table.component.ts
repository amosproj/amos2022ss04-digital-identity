import { SelectionModel } from '@angular/cdk/collections';
import { Component,  EventEmitter,  Input, isDevMode, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
export interface filterType {
  column: string;
  filter: string;
  idx: number;
}

export interface deleteProperties {
  header: string;
  text: string;
}

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.css'],
  animations:  [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0px'})),
      state('expanded', style({height: '*', minHeight:'48px'})),
      transition('expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})

export class FilteredTableComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() displayedColNames: string[] = [];
  @Input() internalColNames: string[] = [];
  @Input() displayedColSelectNames: string[] = [];
  @Input() internalColSelectNames: string[] = [];
  @Input() dialogRef: MatDialog = <MatDialog>{};
  @Input() buttonFunctions:((arg0:any,arg1:any,arg2:any) => void)[] = [((arg0, arg1, arg2) => {""})]
  @Input() showExpandedDetails: boolean = false;
  @Input() expandedDetails:any[] = [];

  // delete properties
  @Input() deleteRequest: (arg0: any, arg1: any) => void = (arg0, arg1) => {};
  @Input() buildDeleteProperties: (row: any) => deleteProperties = (row) => {
    return {
      header: 'Delete Entry?',
      text: 'Are you sure to delete this entry?',
    };
  };

  @Output() selectionChanged = new EventEmitter<{dataSelection:any[],additionalData:any[]}>();

  filteredTableSource: MatTableDataSource<any> = new MatTableDataSource();
  filterInput: FormGroup = new FormGroup({ input: new FormControl('') });
  selectedCol: FormGroup = new FormGroup({ col: new FormControl('all') });
  appliedFilters: filterType[] = [];
  selectedEntries: number[] = [];
  selection: SelectionModel<any>;
  expandedDetailsFormArray: FormArray = new FormArray([]);


  constructor() {
    const initialSelection: any[] | undefined = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);;
    this.filteredTableSource = new MatTableDataSource(this.tableData);
  }

  ngOnInit(): void {
    this.loadDataInMatTable(this.tableData);
    let data = new FormArray([]);
    if (this.tableData.length != this.expandedDetails.length) {
      if (isDevMode()) {
        console.log('Error! Length of provided data doesn\'t match length of provided data for expanded details');
      }
    }
    else{
      for (let i = 0; i < this.expandedDetails.length; i++) {
        let group = new FormGroup({});
        for (let j = 0; j < this.expandedDetails[i].attributes.length; j++) {
          let attrib = this.expandedDetails[i].attributes

          for (let k = 0; k < attrib.length; k++) {
            group.addControl(attrib[k], new FormControl(false));
          }
        }
        data.push(group);
      }
      this.expandedDetailsFormArray = data;
      console.log('formArray',this.expandedDetailsFormArray);
    }
  }
  getFormGroup(row : number) : FormGroup {
    return <FormGroup>this.expandedDetailsFormArray.at(row)
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
      let otherItemsBeforeButton = 0;
      for (let colIdxCounter = 0;colIdxCounter < colIndex; colIdxCounter++) {
        if (this.internalColNames[colIdxCounter] != 'button') {
          otherItemsBeforeButton++;
        }
      }

      if (isDevMode()) {
        console.log('Button event');
        console.log(this.buttonFunctions, colIndex - otherItemsBeforeButton)
      }

      this.buttonFunctions[
        colIndex - otherItemsBeforeButton
      ](rowIndex, this.tableData, this.dialogRef);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.length;
    return numSelected == numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.tableData);
  }

  // getSelectionItems() {
  //   return this.selection.selected;
  // }

  selectionChangedRow(row: any) {
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].id == row.id) {
        for (let j = 0; j < this.expandedDetails[i].attributes.length; j++) {
            (<FormGroup>this.expandedDetailsFormArray.at(i)).controls[this.expandedDetails[i].attributes[j]].setValue(this.selection.isSelected(this.tableData[i]));
          }
      }
    }
  }

  selectionChangedAllRows() {
    for (let i = 0; i < this.tableData.length; i++) {
      // console.log('attribute array',this.expandedDetails[i].attributes)
      for (let j = 0; j < this.expandedDetails[i].attributes.length; j++) {
          (<FormGroup>this.expandedDetailsFormArray.at(i)).controls[this.expandedDetails[i].attributes[j]].setValue(this.selection.isSelected(this.tableData[i]));
        }
    }
  }

  onSelectionChange() {
    this.selectionChanged.emit({dataSelection:this.selection.selected, additionalData:this.expandedDetailsFormArray.value})
  }

  openDeleteDialog(row: number) {
    let props: deleteProperties = this.buildDeleteProperties(
      this.tableData[row]
    );
    this.dialogRef.open(DeleteDialogComponent, {
      data: {
        header: props.header,
        text: props.text,
        id: this.tableData[row].id,
        connectionId: this.tableData[row].connectionId,
        deleteRequest: this.deleteRequest,
      },
    });
  }
}
