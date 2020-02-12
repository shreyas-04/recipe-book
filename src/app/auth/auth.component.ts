import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if(this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password)
    }else {
      authObs = this.authService.signUp(form.value.email, form.value.password)
    }

    authObs.subscribe(
      (authData) => {
        console.log(authData);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      }, (err) => {
        this.error = err;
        this.isLoading = false;
      }
    )

    form.reset();
  }

  onOk() {
    this.error = null;
  }
}
