import { Observable } from 'rxjs';

export abstract class UserApi {
    // signIn is a method with 3 params
    signIn: (username: string, password: string, rememberMe: boolean) => Observable<any>;
}
