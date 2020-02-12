import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  // selectedRecipe: Recipe;

  constructor(private dataStorageService: DataStorageService) { }

  recSub: Subscription;

  ngOnInit() {
    // this.recipeService.recipeSelected
    // .subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })
    this.recSub = this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.recSub.unsubscribe();
  }
}
