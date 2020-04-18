import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  constructor() { }

  recSub: Subscription;

  ngOnInit() {
    // this.recSub = this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    // this.recSub.unsubscribe();
  }
}
