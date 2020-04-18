import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor( private store: Store<fromApp.AppState>) { }

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  private storeSub: Subscription;

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      if(authState.authError) {
        this.error = authState.authError;
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.isLoading = true;

    if(this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: form.value.email, password: form.value.password}))
    }else {
      this.store.dispatch(new AuthActions.SignupStart({email: form.value.email, password: form.value.password}))
    }
    
    form.reset();
  }

  ngOnDestroy(): void {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
