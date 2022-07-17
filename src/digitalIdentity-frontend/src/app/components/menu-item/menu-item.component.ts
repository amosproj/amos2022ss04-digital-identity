import {
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'; //prettier ignore
import {
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
  @Output() public itemSelected = new EventEmitter<any>();
  constructor(public router: Router) {}
  selectedChild!: MenuItem;

  public menuOpened = false;

  handleMouseEvent(event:any, item:any = undefined) {
    if (isDevMode()) {console.log('MouseEvent', event, item)}
    if (event) {
      event.preventDefault();
      switch (event.button) {
        //left mouse button
        case 0:
          if (item != undefined) {
            if (event.ctrlKey){
              this.openNewTab(item.route)
            }
            else if (event.shiftKey) {
              this.openNewWindow(item.route);
            }
            else {
              this.onSelect(item);
            }
          };
          break;
        //middle mouse button
        case 1: if (item != undefined) {this.openNewTab(item.route)}; break;
        //right mouse button
        case 2: break;
      }
    }
    this.itemSelected.emit({});
    return false;
  }

  openNewTab(route:any) {
    window.open(route, '_blank');
  }

  openNewWindow(route:any) {
    window.open(route, '_blank', 'location=yes,height=1920,width=1024,scrollbars=yes,status=yes');
  }

  onSelect(menuItem: MenuItem): void {
    this.selectedChild = menuItem;
    this.menuOpened = true;
  }

  ngOnInit(): void {}
}
