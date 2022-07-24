import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DataUpdateService } from 'src/app/services/data-update.service';
export interface filterType {
  column: string;
  filter: string;
  idx: number;
}

export interface deleteProperties {
  header: string;
  text: string;
}

export function posNumberValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    if (control.value == '') {
      return null;
    }
    if (/^\d*$/.test(control.value)) {
      return null;
    } else {
      return { message: 'falseFormat' };
    }
  };
}
@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px' })),
      state('expanded', style({ height: '*', minHeight: '48px' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FilteredTableComponent implements OnInit {
  @Input('data')
  get data(): any[] {
    return this.tableData;
  }
  set data(data: any[]) {
    this.tableData = data;
    for (let i = 0; i < data.length; i++) {
      data[i].table_idx = i;
    }
  }
  tableData: any[] = [];

  // @Input() tableData: any[] = [];
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
  @Input() showExpandedDetails: boolean = false;
  @Input() expandedDetails: any[] = [];
  @Input() filterParams: string[] = [];

  // delete properties
  @Input() deleteRequest: (arg0: any, arg1: any) => void = (arg0, arg1) => {};
  @Input() buildDeleteProperties: (row: any) => deleteProperties = (row) => {
    return {
      header: 'Delete Entry?',
      text: 'Are you sure to delete this entry?',
    };
  };

  @Output() selectionChanged = new EventEmitter<{
    dataSelection: any[];
    additionalData: any[];
    valid: boolean;
  }>();

  filteredTableSource: MatTableDataSource<any> = new MatTableDataSource();
  filterInput: FormGroup = new FormGroup({ input: new FormControl('') });
  selectedCol: FormGroup = new FormGroup({ col: new FormControl('all') });
  appliedFilters: filterType[] = [];
  selectedEntries: number[] = [];
  selection: SelectionModel<any>;
  expandedDetailsFormArray: FormArray = new FormArray([]);

  constructor(
    public fb: FormBuilder,
    private dataUpdateService: DataUpdateService
  ) {
    const initialSelection: any[] | undefined = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<any>(
      allowMultiSelect,
      initialSelection
    );
    this.filteredTableSource = new MatTableDataSource(this.tableData);

    this.dataUpdateService.data.subscribe((data) => {
      this.loadDataInMatTable(data);
    });
  }

  ngOnInit(): void {
    this.loadDataInMatTable(this.tableData); //TODO: nötig? ist doch bereits in 113 verbunden
    let data = new FormArray([]);
    if (
      this.expandedDetails.length != 0 &&
      this.tableData.length != this.expandedDetails.length
    ) {
      if (isDevMode()) {
        console.log(
          "Error! Length of provided data doesn't match length of provided data for expanded details"
        );
      }
    } else {
      for (let i = 0; i < this.expandedDetails.length; i++) {
        let group = new FormGroup({});
        for (let j = 0; j < this.expandedDetails[i].attributes.length; j++) {
          let attrib = this.expandedDetails[i].attributes;

          for (let k = 0; k < attrib.length; k++) {
            group.addControl(
              attrib[k],
              this.fb.group({
                credDefId: {
                  value: this.tableData[i].id,
                  disabled: true,
                },
                selected: { value: false, disabled: true },
                filter: { value: 'no filter', disabled: true },
                value: [{ value: 0, disabled: true }, posNumberValidator()],
              })
            );
          }
        }
        data.push(group);
      }
      this.expandedDetailsFormArray = data;
    }
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
            let tmp_data = (data as { [key: string]: any })[key];
            if (tmp_data == undefined) {
              return currentTerm + '◬';
            }
            if (key == 'active') {
              return currentTerm + '◬' + tmp_data ? 'active' : 'inactive';
            } else {
              return currentTerm + '◬' + tmp_data;
            }
          } else {
            return currentTerm;
          }
        }, '')
        .toLowerCase();
    } else {
      let tmp_data = (data as { [key: string]: any })[column];
      if (tmp_data == undefined) {
        dataStr = '';
      } else {
        if (column == 'active') {
          dataStr = '◬' + tmp_data ? 'active' : 'inactive';
        } else {
          dataStr = '◬' + tmp_data.toLowerCase();
        }
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

  selectionChangedRow(data: any) {
    let idx = data.table_idx;
    let attributes = this.expandedDetails[idx].attributes;

    for (let j = 0; j < attributes.length; j++) {
      let controls = this.getInnerFormGroup(idx, attributes[j]).controls;

      controls['selected'].setValue(this.selection.isSelected(data));

      if (!this.selection.isSelected(data)) {
        controls['value'].setValue(0);
        controls['filter'].setValue('no filter');
      }

      // toggle enabled
      for (let [key, control] of Object.entries(controls)) {
        if (this.selection.isSelected(data)) control.enable();
        else control.disable();
      }
    }
  }

  selectionChangedAllRows() {
    for (let data of this.tableData) {
      this.selectionChangedRow(data);
    }
  }

  onSelectionChange() {
    this.selectionChanged.emit({
      dataSelection: this.selection.selected,
      additionalData: this.expandedDetailsFormArray.value,
      valid: this.expandedDetailsFormArray.valid,
    });
  }

  getFormGroup(index: number): FormGroup {
    return <FormGroup>this.expandedDetailsFormArray.at(index);
  }

  getInnerFormGroup(index: number, subitemName: string): FormGroup {
    return <FormGroup>(
      (<FormGroup>this.expandedDetailsFormArray.at(index)).controls[subitemName]
    );
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

  isRowDisabled(row: number) {
    return !this.selection.isSelected(this.tableData[row]);
  }

  getButtonColName(i: number) {
    return this.internalColNames[i] == 'button'
      ? 'button'
      : this.displayedColNames[i];
  }
}
