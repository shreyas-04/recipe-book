import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';

import { map, switchMap } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from '../../store/app.reducer';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  //@Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  
  constructor( private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
    .pipe(
      map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipe')
      }),
      map(recipeState => recipeState.recipes.find((recipe, index) => index === this.id))
    )
    .subscribe(recipe => this.recipe = recipe)
  }
    

  toBeAdded() {
    this.recipe.ingredients.forEach(ingredient => {
      this.store.dispatch(new shoppingListActions.AddIngredient(ingredient))
  });
  }


  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(+this.id));
    // this.recipeService.deleteRecipe(+this.id);
    this.router.navigate(['recipes']);
  }
}
