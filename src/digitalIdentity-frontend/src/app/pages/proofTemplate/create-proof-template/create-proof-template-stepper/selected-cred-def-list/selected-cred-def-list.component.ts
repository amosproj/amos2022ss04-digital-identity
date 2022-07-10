import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-cred-def-list',
  templateUrl: './selected-cred-def-list.component.html',
  styleUrls: ['./selected-cred-def-list.component.css'],
})
export class SelectedCredDefListComponent implements OnInit {
  @Input()
  selectedCredDefs!: any[];
  @Input()
  selectedAttributes!: any[];

  constructor() {}

  ngOnInit(): void {}

  // TODO: auch nicht mehr sicher, ob das so sinnvoll ist
  // keyValueArrayOf(obj: object) {
  keyValueArrayOf(idx: number) {
    let obj = this.selectedAttributes[idx];
    return Object.entries(obj);
  }
}
