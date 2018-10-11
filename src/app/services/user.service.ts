import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import { UserApi } from '../../fw/users/user-api';
import { Router } from '@angular/router';

@Injectable()
export class UserService implements UserApi {

  isAuthenticated = false;

  constructor(private router: Router) { }

  signIn(username: string, password: string, rememberMe: boolean): Observable<any> {
    // console.log('UserService.signIn: ' + username + ' ' + password + ' ' + rememberMe);

    // success
    this.isAuthenticated = true;

    // of: emits the arguments you provide, then completes.
    // phát ra các tham số đầu vào (cái này nối tiếp ngay cái kia), sau đó phát ra 1 thông báo hoàn thành.
    // ở đây sẽ trả về 1 observable rỗng & delay 2s sau đó mới sign in
    return Observable.of({}).delay(2000);


    // error
    // return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Invalid User Name and/or Password'));
  }

  signOut(): Observable<any> {
    this.isAuthenticated = false;
    this.router.navigate(['/signin']);
    return Observable.of({}).delay(2000);
}

}
