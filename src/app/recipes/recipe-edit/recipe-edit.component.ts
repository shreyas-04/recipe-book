import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  private storeSub: Subscription;

  constructor(private route: ActivatedRoute,  private router: Router, private store: Store<fromApp.AppState> ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })

  }

  private initForm() {

    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let RecipeIngredients = new FormArray([]);

    if(this.editMode) {
      this.storeSub = this.store.select('recipe')
      .pipe(
        map(recipeState => recipeState.recipes.find((rec, index) => index === this.id))
      )
      .subscribe(recipe => {
        
        recipeName = recipe.name;
        recipeImage = recipe.imagePath;
        recipeDescription = recipe.description;
        if(recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            RecipeIngredients.push(
              new FormGroup ({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
              );
            }
          }
        })
    }
        
    this.recipeForm = new FormGroup({
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImage, Validators.required),
      'ingredients': RecipeIngredients,
      'name' : new FormControl(recipeName, Validators.required)
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({id: this.id, recipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if(this.storeSub)
    this.storeSub.unsubscribe();
    
  }
}
