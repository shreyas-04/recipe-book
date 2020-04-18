import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    
    constructor(private action$: Actions, private http: HttpClient, private store: Store<FromApp.AppState>) {}

    @Effect()
    fetchRecipes = this.action$.pipe(
        ofType(RecipeActions.permissionActions.FETCH_RECIPES),
        switchMap( () => {
            return this.http.get<Recipe []>('https://recipe-book-12345.firebaseio.com/recipes.json')
        }),
        map(recipes => {
            return recipes.map(recipe => {
              return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
        }),
        map(recipes => {
            return (new RecipeActions.SetRecipes(recipes))
        })
    )

    @Effect({dispatch: false})
    storeRecipe = this.action$.pipe(
        ofType(RecipeActions.permissionActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipe')),
        switchMap(([actionData, RecipeState]) => {
            return this.http.put('https://recipe-book-12345.firebaseio.com/recipes.json', RecipeState.recipes)
        })
    ) 
}