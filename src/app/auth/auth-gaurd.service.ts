import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';


@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user
            }),
            map(user => {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
                this.router.navigate(['/auth']);
                return false;
            })
        );
    };
}