import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attr-list-item',
  templateUrl: './attr-list-item.component.html',
  styleUrls: ['./attr-list-item.component.css'],
})
export class AttrListItemComponent {
  @Input()
  name!: string;

  @Input('params')
  set params(params: any) {
    if (params.filter != undefined) this.filter = params.filter;
    if (params.selected != undefined) this.selected = params.selected;
    if (params.value != undefined) this.value = params.value;
  }
  get params() {
    return { selected: this.selected, filter: this.filter, value: this.value };
  }
  selected: boolean = false;
  filter: string = 'no filter';
  value!: any;
}
