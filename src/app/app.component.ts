import { Component } from '@angular/core';
import { FrameworkConfigService, FrameworkConfigSettings } from './fw/services/framework-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // update data on service
  constructor (private frameworkConfigService: FrameworkConfigService) {
    const config: FrameworkConfigSettings = {
      socialIcons: [
        { imageFile: 'assets/images/facebook.png', alt: 'Facebook', link: 'http://www.facebook.com'},
        { imageFile: '../assets/images/google-plus.png', alt: 'Google +', link: 'http://www.google.com' },
        { imageFile: 'assets/images/twitter.png', alt: 'Twitter', link: 'http://www.twitter.com' }
      ],
      showLanguageSelector: true,
      showUserControls: true,
      showStatusBar: true,
      showStatusBarBreakpoint: 800
    };

    frameworkConfigService.configure(config);
  }

}
