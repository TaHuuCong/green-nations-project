// show or not show side bar
// config screen size

import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class ScreenService {

  // Subject is similar to an observable but it's also capable of firing off events for that observable
  // (tương tự observable nhưng có khả năng bắn ra sự kiện cho observable đó)
  private resizeSource = new Subject<null>();

  // $ is a convention that's used to show that something is an observable and it can be subscribed to
  // ($ là quy ước để chỉ ra rằng cái gì đó là 1 observable và nó có thể được đăng ký (theo dõi))
  // --> anyone injecting this screen service can subscribe to this resize$ event.
  resize$ = this.resizeSource.asObservable();

  // public properties
  largeBreakpoint = 800;
  screenWidth = 1000;
  screenHeight = 800;

  constructor() {

    // The window object always exists in browsers
    // Trong Angular có thể ko hỗ trợ window object nên phải để trong try-catch cho an toàn
    try {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      // 'resize' is window event
      window.addEventListener('resize', (event) => this.onResize(event));
    } catch (e) {
    }
  }

  isLarge(): boolean {
    return this.screenWidth >= this.largeBreakpoint;
  }

  onResize($event): void {
    // lấy chiều rộng và cao của trình duyệt
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    // send out a message to any subscribers of the subject.
    // thông báo rằng screen đã được resize
    this.resizeSource.next();
  }
}
