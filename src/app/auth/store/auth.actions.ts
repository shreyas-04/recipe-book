import { Action } from "@ngrx/store";
import { User } from "../users.model";

export enum permissionActions {
    AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS',
    LOGOUT = 'LOGOUT',
    LOGIN_START = 'LOGIN_START',
    AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL',
    SIGNUP_START = 'SIGNUP_START',
    AUTO_LOGIN = 'AUTO_LOGIN'
}

export interface loginDetails {
    email: string,
    password: string
}

export class AuthenticateSuccess implements Action{
    readonly type = permissionActions.AUTHENTICATE_SUCCESS;
    constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type = permissionActions.LOGOUT
}

export class AuthenticateFail implements Action {
    readonly type = permissionActions.AUTHENTICATE_FAIL;
    constructor(public payload:string) {}
}

export class LoginStart implements Action {
    readonly type = permissionActions.LOGIN_START;
    constructor( public payload: loginDetails) {}
}

export class SignupStart implements Action {
    readonly type = permissionActions.SIGNUP_START;
    constructor( public payload: loginDetails) {}
}

export class AutoLogin implements Action {
    readonly type = permissionActions.AUTO_LOGIN;
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | AutoLogin;