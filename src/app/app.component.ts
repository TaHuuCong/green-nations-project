import { Component } from '@angular/core';
import { FrameworkConfigService, FrameworkConfigSettings } from '../fw/services/framework-config.service';
import { MenuService } from '../fw/services/menu.service';
import { initialMenuItems } from './input-data/app.menu';
import { initialFWConfig } from './input-data/app.fwconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private frameworkConfigService: FrameworkConfigService,
               private menuService: MenuService) {

    // update data on service
    frameworkConfigService.configure(initialFWConfig);

    menuService.items = initialMenuItems;

  }

}
