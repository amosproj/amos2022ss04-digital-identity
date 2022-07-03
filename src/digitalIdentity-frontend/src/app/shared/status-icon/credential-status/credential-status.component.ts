import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-credential-status',
  templateUrl: './credential-status.component.html',
  styleUrls: ['./credential-status.component.css'],
})
export class CredentialStatusComponent implements OnInit {
  @Input() status = 'none';

  constructor() {}

  ngOnInit(): void {}
}
