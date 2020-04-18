import { User } from "../users.model";
// import { AuthActions } from "./auth.actions";
import * as AuthActions from "./auth.actions";

export interface State {
    user: User,
    authError : string,
    loading: boolean
}

const initialState = { user: null, authError: null, loading: false }

export function authReducer (state = initialState, action: AuthActions.AuthActions) {
    switch(action.type) {

        case AuthActions.permissionActions.AUTHENTICATE_SUCCESS :
            const user = action.payload
            return {
                ...state,
                user: user,
                authError: null,
                loading: false
            }
        case AuthActions.permissionActions.LOGOUT :
            return{
                ...state,
                user: null
            }

        case AuthActions.permissionActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }

        case AuthActions.permissionActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }            

        default :
            return state
    }
}