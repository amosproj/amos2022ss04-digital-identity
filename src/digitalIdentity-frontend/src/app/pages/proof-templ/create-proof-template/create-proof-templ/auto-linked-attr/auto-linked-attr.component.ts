import { Component, Input, OnInit } from '@angular/core';
import { linkedAttribute } from '../../create-proof-template.module';

@Component({
  selector: 'app-auto-linked-attr',
  templateUrl: './auto-linked-attr.component.html',
  styleUrls: ['./auto-linked-attr.component.css'],
})
export class AutoLinkedAttrComponent implements OnInit {
  @Input()
  linkedAttributes: linkedAttribute[] = [];
  @Input()
  loadingAttributes: boolean = false;

  displayedColumns = ['attribute', 'source'];

  constructor() {}

  ngOnInit(): void {}
}
