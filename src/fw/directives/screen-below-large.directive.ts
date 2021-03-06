import { Directive, ViewContainerRef, TemplateRef, Input, OnDestroy } from '@angular/core';
import { ScreenService } from '../services/screen.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[fwScreenBelowLarge]'
})
export class ScreenBelowLargeDirective implements OnDestroy {

  private hasView = false;
  private screenSubscription: Subscription;

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<Object>,
    private screenService: ScreenService) {
      this.screenSubscription = screenService.resize$.subscribe(() => this.onResize());
  }

  @Input()
  set screenLarge(condition) {
    // ignore the passed condition and set it based on screen size
    condition = this.screenService.screenWidth < this.screenService.largeBreakpoint;

    // nếu thỏa mãn đk và không có view thì tạo view (template)
    if (condition && !this.hasView) {
      this.hasView = true;
      this.viewContainer.createEmbeddedView(this.template);
    } else if (!condition && this.hasView) {
      this.hasView = false;
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    // this.screenSubscription.unsubscribe();
  }

  onResize() {
    // trigger the setter
    this.screenLarge = false;
  }

}
