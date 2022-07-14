import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proof-status',
  templateUrl: './proof-status.component.html',
  styleUrls: ['./proof-status.component.css'],
})
export class ProofStatusComponent implements OnInit {
  @Input() status = 'none';
  constructor() {}

  ngOnInit(): void {}
}
