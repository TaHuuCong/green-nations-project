import { Injectable } from '@angular/core';

// tslint:disable-next-line:no-empty-interface
export interface MenuItem {
  text: string;
  icon: string;
  route: string;
  submenu: Array<MenuItem>;
}

@Injectable()
export class MenuService {

  items: Array<MenuItem>;

  // large screen
  isVertical = false;

  // small screen
  showingLeftSideMenu = false;

  toggleLeftSideMenu(): void {
    this.isVertical = true;
    this.showingLeftSideMenu = !this.showingLeftSideMenu;
  }

  // change between vertical and horizontal menu
  toggleOrientation(): void {
    this.isVertical = !this.isVertical;
  }

}
