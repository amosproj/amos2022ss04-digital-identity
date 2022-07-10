import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-linked-attributes',
  templateUrl: './auto-linked-attributes.component.html',
  styleUrls: ['./auto-linked-attributes.component.css'],
})
export class AutoLinkedAttributesComponent implements OnInit {
  @Input()
  linkedAttributes: string[] = [];
  @Input()
  loadingAttributes: boolean = false;

  displayedColumns = ['attribute', 'source'];

  constructor() {}

  ngOnInit(): void {}
}
