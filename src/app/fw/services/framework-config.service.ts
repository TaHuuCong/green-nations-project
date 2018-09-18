// show or not show header (social icon, language, user control) and footer

import { Injectable } from '@angular/core';

export interface IconFiles {
  imageFile: string;
  alt: string;
  link: string;
}

export interface FrameworkConfigSettings {
  // show the flag and have a dropdown for a langugue
  showLanguageSelector?: boolean;

  // show the sign in or other user controls (after login: show username and sign out button)
  showUserControls?: boolean;

  // show the status bar at the bottom
  showStatusBar?: boolean;

  // set breakpoint for status bar
  showStatusBarBreakpoint?: number;

  // social icons file array
  socialIcons?: Array<IconFiles>;
}

@Injectable()
export class FrameworkConfigService {

  showLanguageSelector = true;
  showUserControls = true;
  showStatusBar = true;
  showStatusBarBreakpoint = 0;
  socialIcons = new Array<IconFiles>();

  // update this object with the settings from argument
  configure(settings: FrameworkConfigSettings): void {
    Object.assign(this, settings);
  }

}
