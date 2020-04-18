

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';

export interface State {
    ingredients: Ingredient[],
    editedingredient : Ingredient,
    editedingredientIndex: number
}



const initialState: State = {
    ingredients: [
        {
            name: 'Apples',
            amount: '5'
        },
        {
            name: 'Tomatoes',
            amount: '10' 
        }
    ],
    editedingredient: null,
    editedingredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.slActions) {
    switch (action.type) {
        case ShoppingListActions.slActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }

        case ShoppingListActions.slActionTypes.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedingredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients]
            updatedIngredients[state.editedingredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedingredient: null,
                editedingredientIndex: -1
            }    

        case ShoppingListActions.slActionTypes.DELETE_INGREDIENT:
            
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient, i) => i !== state.editedingredientIndex),
                editedingredient: null,
                editedingredientIndex: -1
            }   
    
        case ShoppingListActions.slActionTypes.START_EDIT:
        
            return {
                ...state,
                editedingredientIndex: action.payload,
                editedingredient: {...state.ingredients[action.payload]}
            }   

                
        case ShoppingListActions.slActionTypes.STOP_EDIT:
            
            return {
                ...state,
                editedingredient: null,
                editedingredientIndex: -1
            }   

        default:
            return state;
    }
}