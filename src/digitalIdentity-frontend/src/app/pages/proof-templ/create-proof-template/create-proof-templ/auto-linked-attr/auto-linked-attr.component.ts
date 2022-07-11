import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-linked-attr',
  templateUrl: './auto-linked-attr.component.html',
  styleUrls: ['./auto-linked-attr.component.css'],
})
export class AutoLinkedAttrComponent implements OnInit {
  @Input()
  linkedAttributes: string[] = [];
  @Input()
  loadingAttributes: boolean = false;

  displayedColumns = ['attribute', 'source'];

  constructor() {}

  ngOnInit(): void {}
}
