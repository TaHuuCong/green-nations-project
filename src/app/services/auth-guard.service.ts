import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private userService: UserService,
              private router: Router) {}

  // function returns a boolean value: true if the route can be activated or otherwise false
  canActivate(): boolean {
    // if not auth
    if (!this.userService.isAuthenticated) {
      this.router.navigate(['/signin']);
    }
    return this.userService.isAuthenticated;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
