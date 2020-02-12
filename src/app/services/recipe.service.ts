import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class RecipeService {
    constructor(private shoppingListService: ShoppingListService) {}

    // recipeSelected = new EventEmitter<Recipe>();

    recipeSelected: string;
    recipesChanged = new Subject();

    recipes: Recipe[] = [
    //     {
    //         name: 'Veg Cheese Pizza',
    //         description: 'Cheesy tomato mozzerella pizza',
    //         imagePath: 'https://image.shutterstock.com/image-photo/supreme-pizza-lifted-slice-1-600w-84904912.jpg',
    //         ingredients: [
    //             {
    //                 name: 'Pizza Base',
    //                 amount: '1'
    //             },

    //             {
    //                 name: 'Tomatoes',
    //                 amount: '2'
    //             },

    //             {
    //                 name: 'Cheese',
    //                 amount: '1'
    //             }
    //         ]
    //     },

    //     {
    //         name: 'Exotic Burger',
    //         description: 'Fried aloo patty in bun served with cheese',
    //         imagePath: 'https://media.gettyimages.com/photos/cheeseburger-with-french-fries-picture-id922684138?s=612x612',
    //         ingredients: [

    //             {
    //                 name: 'Potato',
    //                 amount: '1'
    //             },

    //             {
    //                 name: 'Cheese Slices',
    //                 amount: '2'
    //             }
    //         ]
    //     }
        
    //     // new Recipe('Veg Cheese Pizza', 'Cheesy tomato mozzerella pizza', 'https://image.shutterstock.com/image-photo/supreme-pizza-lifted-slice-1-600w-84904912.jpg', 
    //     // [
    //     //     new Ingredient('Pizza Base', 1),
    //     //     new Ingredient('Tomatoes', 2),
    //     //     new Ingredient('Cheese', 1)
    //     // ]),
    //     // new Recipe('Exotic Burger', 'Fried aloo patty in bun served with cheese', 'https://media.gettyimages.com/photos/cheeseburger-with-french-fries-picture-id922684138?s=612x612', 
    //     // [
    //     //     new Ingredient('Potato', 1),
    //     //     new Ingredient('Cheese Slices', 2)
    //     // ])
    ];

    takeRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    } 

    addToShoppingList(ingredients: Ingredient[]){
        ingredients.forEach(ingredient => {
            this.shoppingListService.addIngredient(ingredient);
        });
    }

    getRecipe(id: string) {
        const recipe = this.recipes.find(
            (r: Recipe) => {
                return this.recipes.indexOf(r).toString() === id;
            } 
        );
        return recipe;
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);

        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        // this.recipes[index].id = index.toString();
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}