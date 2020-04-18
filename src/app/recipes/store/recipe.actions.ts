import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export enum permissionActions {
    SET_RECIPES = 'SET_RECIPES',
    STORE_RECIPES = 'STORE_RECIPES',
    FETCH_RECIPES = 'FETCH_RECIPES',
    ADD_RECIPE = 'ADD_RECIPE',
    UPDATE_RECIPE = 'UPDATE_RECIPE',
    DELETE_RECIPE = 'DELETE_RECIPE',
}

export class SetRecipes implements Action {
    readonly type = permissionActions.SET_RECIPES;
    constructor( public payload: Recipe[]) {}
}

export class UpdateRecipe implements Action {
    readonly type = permissionActions.UPDATE_RECIPE;
    constructor(public payload: {id:number, recipe: any}) {}
}

export class FetchRecipes implements Action {
    readonly type = permissionActions.FETCH_RECIPES;
}

export class StoreRecipes implements Action {
    readonly type = permissionActions.STORE_RECIPES;
}

export class AddRecipe {
    readonly type = permissionActions.ADD_RECIPE;
    constructor(public payload: Recipe) {}
}


export class DeleteRecipe {
    readonly type = permissionActions.DELETE_RECIPE;
    constructor(public payload: number) {}
}

export type RecipeActions = SetRecipes | UpdateRecipe | FetchRecipes | AddRecipe | DeleteRecipe | StoreRecipes;
