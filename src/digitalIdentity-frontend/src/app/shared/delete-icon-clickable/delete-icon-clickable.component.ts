import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, isDevMode, OnInit } from '@angular/core';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-delete-icon-clickable',
  templateUrl: './delete-icon-clickable.component.html',
  styleUrls: ['./delete-icon-clickable.component.css'],
})
export class DeleteIconClickableComponent implements OnInit {
  @Input() id: number = -1;
  @Input() deleteRequest: (id: number) => void = (id: number) => {
    ('');
  };

  constructor(public httpService: BackendHttpService) {}

  ngOnInit(): void {}

  deleteEvent() {
    if (isDevMode()) {console.log('Delete this item' + this.id)};
    this.deleteRequest(this.id);
  }
}
