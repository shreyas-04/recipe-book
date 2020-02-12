import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.user.pipe(
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