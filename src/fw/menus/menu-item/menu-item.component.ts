import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer
} from '@angular/core';
import { MenuItem, MenuService } from '../../services/menu.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})

// MenuItemComponent is child of MenuComponent
export class MenuItemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('menu-item')
  item: MenuItem; // property binding from parent component

  // parent is popup menu or not?
  // if parentIsPopup = true then add class parent-is-popup to the host element
  @HostBinding('class.parent-is-popup')
  @Input()
  parentIsPopup = true;

  // route is actived or not?
  isActiveRoute = false;

  // show popup if the mouse is inside of the popup or item
  mouseInItem = false;
  mouseInPopup = false;

  // where the popup should be placed
  popupLeft = 0;
  popupTop = 34;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private el: ElementRef,
    private renderer: Renderer
  ) {}

  checkActiveRoute(route: string) {
    this.isActiveRoute = route === '/' + this.item.route;
  }

  ngOnInit(): void {
    this.checkActiveRoute(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute(event.url);
        // console.log(event.url + ' ' + this.item.route + ' ' + this.isActiveRoute);
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    event.stopPropagation();

    if (this.item.submenu) {
      if (this.menuService.isVertical) {
        this.mouseInPopup = !this.mouseInPopup;
      }
    } else if (this.item.route) {
      // force horizontal menus to close by sending a mouseleave event
      const newEvent = new MouseEvent('mouseleave', { bubbles: true });
      this.renderer.invokeElementMethod(
        this.el.nativeElement,
        'dispatchEvent',
        [newEvent]
      );

      this.router.navigate(['/' + this.item.route]);
    }
  }

  // event called when the mouse enters the popup
  onPopupMouseEnter(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = true;
    }
  }

  // event called when the mouse leaves the popup
  onPopupMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = false;
    }
  }

  // event called when the mouse enters the menu item
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.menuService.isVertical) {
      if (this.item.submenu) {
        this.mouseInItem = true;
        if (this.parentIsPopup) {
          this.popupLeft = 160;
          this.popupTop = -1;
        }
      }
    }
  }

  // event called when the mouse leaves the menu item
  // name of event: mouseleave; parameter: $event
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInItem = false;
    }
  }
}
