import { Recipe } from "../recipe.model";
import  * as RecipeActions from "./recipe.actions";

export interface State {
    recipes: Recipe[];
}

const initialState: State =  {
    recipes: []
}

export function recipeReducer (state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case RecipeActions.permissionActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        
        case RecipeActions.permissionActions.UPDATE_RECIPE: 
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.id] = action.payload.recipe;

            return {
                ...state,
                recipes: updatedRecipes 
            };

        case RecipeActions.permissionActions.ADD_RECIPE: 
        return {
            ...state,
            recipes: [...state.recipes , action.payload] 
        };   
        
        case RecipeActions.permissionActions.DELETE_RECIPE: {

            const updatedRecipes = state.recipes.filter((recipe, i) => i !== action.payload)
            return {
                ...state,
                recipes: updatedRecipes 
            };   
        }
        
        default: 
            return state
    }
}