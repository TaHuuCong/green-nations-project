import { Component, OnInit } from '@angular/core';
import { UserApi } from '../user-api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fw-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formError: boolean;
  submitting = false;
  user = 'congtah';
  pass = '123456';
  submitted = false;

  constructor(private userApi: UserApi,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(signInForm: NgForm) {
    if (signInForm.valid && signInForm.value.username === this.user && signInForm.value.password === this.pass) {
      // console.log('submitting...', signInForm);
      this.submitting = true;
      this.formError = false;

      this.userApi.signIn(signInForm.value.username, signInForm.value.password, signInForm.value.rememberMe)
        .subscribe(
          // success
          (data) => {
            // console.log('got valid: ', data);
            this.router.navigate(['/authenticated']);
          },

          // error
          (err) => {
            this.submitting = false;
            // console.log('got error: ', err);
            this.formError = err;
          }
        );
    } else {
      this.formError = true;
    }
  }
}
