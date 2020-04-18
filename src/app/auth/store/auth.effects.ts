import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { User } from '../users.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface AuthResponseData {
    kind?: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate, true);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess(user);
}

const handleError = (errRes) => {
  let errMes = 'An unknown error occured.';
  if(!errRes.error || !errRes.error.error ) {
    return of(new AuthActions.AuthenticateFail(errMes));
  }
  switch(errRes.error.error.message) {
    case 'EMAIL_NOT_FOUND': {
      errMes = 'Email not found.';
      break;
    }

    case 'INVALID_PASSWORD':{
       errMes = 'Invalid Password.'
       break;
    }
   
    case 'EMAIL_EXISTS': {
      errMes = 'Email already exists.';
      break;
    }

    case 'OPERATION_NOT_ALLOWED':{
      errMes = 'Password sign-in is disabled for this project.'
      break;
    }
  }
  return of(new AuthActions.AuthenticateFail(errMes)) // (retuwobeservable without error) so that the stream never dies even if thnerror.
      
}


@Injectable()
export class AuthEffects {

  constructor(private actions$ : Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.permissionActions.SIGNUP_START),
        switchMap((signupData: AuthActions.LoginStart) => { // Switch map is use to create a new observable from other observable
          return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
          {
            email: signupData.payload.email,
            password: signupData.payload.password,
            returnSecureToken: true
          })
            .pipe(
                tap(resData => {
                  this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                  let x = handleAuthentication(resData);
                  console.log(x);
                  return x;
                }),
                catchError(errRes => {
                  let x = handleError(errRes);
                  console.log(x);
                  return x;
                })
            )
        })
    );


    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.permissionActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => { // Switch map is use to create a new observable from other observable
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true
            })
            .pipe(
              tap(resData => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              }),
                map(resData => {
                  let x = handleAuthentication(resData);
                  return x;
                }),
                catchError(errRes => {
                  let x = handleError(errRes);
                  return x;
                })
            )
        })
    );
    
    @Effect()
    autoLogin = this.actions$.pipe(
      ofType(AuthActions.permissionActions.AUTO_LOGIN),
      map(() => {
        const userData: { 
          email: string,
          id: string,
          _token: string,
          _tokenExpirationDate: string,
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
          return { type: 'Dummy'}
        } 

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate), false);
    
        if(loadedUser.token){
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
           
          this.authService.setLogoutTimer(expirationDuration);

          return new AuthActions.AuthenticateSuccess(loadedUser);

        }
        return { type: 'Dummy'}
      })
    )

    @Effect({dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.permissionActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth'])

        }))

      @Effect({dispatch: false })
      authRedirect = this.actions$.pipe(
          ofType(AuthActions.permissionActions.AUTHENTICATE_SUCCESS),
          tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if(authSuccessAction.payload.redirect)
               this.router.navigate(['/'])
          }))
    
}