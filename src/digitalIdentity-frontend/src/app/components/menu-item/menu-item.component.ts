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
  @Output() public itemSelected = new EventEmitter<any>();
  constructor(public router: Router) {}

  public menuOpened = false;

  // public onClick(event: MouseEvent, submenuIndex: number) {
    // public onClick(event: MouseEvent) {
    // event.stopPropagation();
    // this.itemSelected.emit({
    //   submenuIndex: submenuIndex,
    // });
  // }

  handleMouseEvent(event:any, item:any = undefined) {
    console.log('MouseEvent', event, item)
    if (event) {
      event.preventDefault();
      switch (event.button) {
        //left mouse button
        case 0: if (item != undefined && event.ctrlKey) {this.openNewTab(item.route)}; break;
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

  selectedChild!: MenuItem;

  onSelect(menuItem: MenuItem): void {
    this.selectedChild = menuItem;
    this.menuOpened = true;
  }

  ngOnInit(): void {}
}
