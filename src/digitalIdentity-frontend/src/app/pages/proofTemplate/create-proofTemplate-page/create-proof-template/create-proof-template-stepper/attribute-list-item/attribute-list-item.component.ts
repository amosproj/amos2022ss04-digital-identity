import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attribute-list-item',
  templateUrl: './attribute-list-item.component.html',
  styleUrls: ['./attribute-list-item.component.css'],
})
export class AttributeListItemComponent {
  @Input()
  name!: string;

  @Input('params')
  set params(params: any) {
    console.log('set:', params);
    if (params.filter != undefined) this.filter = params.filter;
    if (params.selected != undefined) this.selected = params.selected;
    if (params.value != undefined) this.value = params.value;
    console.log('setting done');
  }
  get params() {
    return { selected: this.selected, filter: this.filter, value: this.value };
  }
  selected: boolean = false;
  filter: string = 'no filter';
  value!: any;
}
