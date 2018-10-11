import { Observable } from 'rxjs';

// abstract class có thể được implement trong Angular
// interface thì không thể

// UserApi là 1 class-interface
export abstract class UserApi {
  // signIn is a method with 3 params, it returns an observable
  // function này được thực thi khi user subcribe()
  signIn: (username: string, password: string, rememberMe: boolean) => Observable<any>;

  // signOut function
  signOut: () => Observable<any>;
}
