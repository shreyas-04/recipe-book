import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export enum slActionTypes {
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    UPDATE_INGREDIENT = 'UPDATE_INGREDIENT',
    DELETE_INGREDIENT = 'DELETE_INGREDIENT',
    START_EDIT = 'START_EDIT',
    STOP_EDIT = 'STOP_EDIT',
    
}

export class AddIngredient implements Action {
    readonly type = slActionTypes.ADD_INGREDIENT;
    constructor( public payload: Ingredient) {}
}

export class UpdateIngredient implements Action {
    readonly type = slActionTypes.UPDATE_INGREDIENT;
    constructor( public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type = slActionTypes.DELETE_INGREDIENT;
  
}

export class StartEdit implements Action {
    readonly type = slActionTypes.START_EDIT
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = slActionTypes.STOP_EDIT;
}

export type slActions = AddIngredient | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;