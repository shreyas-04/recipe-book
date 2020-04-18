import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('recipe')
    .pipe(map(recipeState => recipeState.recipes))
    .subscribe((recipes: Recipe[]) => {
      this.recipes= recipes;
    })
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
