import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworkBodyComponent } from './framework-body/framework-body.component';
import { ContentComponent } from './content/content.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { FrameworkConfigService } from './services/framework-config.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { MenuComponent } from './menu/menu.component';
import { ScreenService } from './services/screen.service';
import { ScreenLargeDirective } from './directives/screen-large.directive';
import { ScreenBelowLargeDirective } from './directives/screen-below-large.directive';

@NgModule({
  declarations: [
    FrameworkBodyComponent,
    ContentComponent,
    TitleBarComponent,
    TopBarComponent,
    StatusBarComponent,
    MenuComponent,
    ScreenLargeDirective,
    ScreenBelowLargeDirective,
  ],
  providers: [
    FrameworkConfigService,
    ScreenService,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrameworkBodyComponent,
  ],
})
export class FwModule { }
