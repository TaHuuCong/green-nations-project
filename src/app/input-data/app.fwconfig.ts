import { FrameworkConfigSettings } from '../../fw/services/framework-config.service';

export let initialFWConfig: FrameworkConfigSettings = {
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

