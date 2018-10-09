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
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'fw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('visibilityChanged', [
      // :enter is alias to 'void => *'
      // :leave is alias to '* => void'
      // void means the DOM element doesn't exist yet, it's not in the DOM
      // * means any possible state that's visible

      // when a element gets added to the DOM, the opacity will go from 0 to 1
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),

      // when a element gets removed to the DOM, the opacity will go from 1 to 0
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})

// MenuItemComponent is child of MenuComponent
export class MenuItemComponent implements OnInit {
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
    public menuService: MenuService,
    private el: ElementRef,
    private renderer: Renderer
  ) {}

  // check the active route
  checkActiveRoute(route: string) {
    this.isActiveRoute = (route === '/' + this.item.route);
  }

  ngOnInit(): void {
    this.checkActiveRoute(this.router.url);

    // access the events property on router, it's an observable that we can subscribe to
    this.router.events.subscribe(event => {
      // if event is an instance of NavigationEnd, meaning that the routing has completed
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute(event.url);
      }
    });
  }

  // @HostListener: khi sự kiện dưới đây được kích hoạt thì nó gọi hàm tương ứng

  // nếu là menu dọc thì khi có 1 sự kiện là click
  // khi click sẽ show popup or hide popup
  @HostListener('click', ['$event'])
  onClick(event): void {
    event.stopPropagation();

    // nếu element có submenu != null (route == null)
    // nếu element có route !=null (submenu == null)
    if (this.item.submenu) {
      // còn nếu là menu ngang thì có 2 event ở dưới
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

  // nếu là menu ngang thì có 2 sự kiện: mouse enter/leave on popup/item
  // nếu mouse enter on popup hoặc on item thì show popup, mouse leave thì hide popup

  // mouse enter/leave on popup
  onPopupMouseEnter(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = true;
    }
  }
  onPopupMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = false;
    }
  }

  // mouse enter/leave on item
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

  @HostListener('mouseleave', ['$event']) // $event là parameter
  onMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInItem = false;
    }
  }
}
