import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MenuItem, MenuService } from '../../services/menu.service';

@Component({
  selector: 'fw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})

// MenuItemComponent is child of MenuComponent
export class MenuItemComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('menu-item') item: MenuItem;   // property binding from parent component

  @HostBinding('class.parent-is-popup')
  @Input() parentIsPopup = true;

  // show popup if the mouse is in the popup or in the menu item
  mouseInItem = false;
  mouseInPopup = false;

  // position of popup (left, top)
  popupLeft = 0;
  popupTop = 34;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

  // mouse enter event
  onPopupMouseEnter(event): void {
    if (!this.menuService.isVertical) {
        this.mouseInPopup = true;
    }
  }

  // mouse leave event
  onPopupMouseLeave(event): void {
      if (!this.menuService.isVertical) {
          this.mouseInPopup = false;
      }
  }

}
