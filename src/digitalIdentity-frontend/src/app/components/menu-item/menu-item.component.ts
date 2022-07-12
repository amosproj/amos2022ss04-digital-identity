import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'; //prettier ignore
import {
  MenuIndex,
  MenuItem,
} from '../navigation-bar/navigation-bar.component'; //prettier ignore
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @Input() items!: MenuItem[];
  @Input() subMenu!: MenuItem;
  @ViewChild('childMenu', { static: true }) public childMenu: any;
  @Output() public itemSelected = new EventEmitter<MenuIndex>();
  constructor(public router: Router) {}

  public menuOpened = false;

  public onClick(event: MouseEvent, submenuIndex: number) {
    event.stopPropagation();
    this.itemSelected.emit({
      submenuIndex: submenuIndex,
    });
  }

  selectedChild!: MenuItem;

  onSelect(menuItem: MenuItem): void {
    this.selectedChild = menuItem;
    this.menuOpened = true;
  }

  ngOnInit(): void {}
}
