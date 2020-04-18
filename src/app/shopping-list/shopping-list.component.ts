import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<fromApp.AppState> ;
  private subscription: Subscription;

  constructor(
    private store: Store<{shoppingList: fromApp.AppState}>
  ) { }

  ngOnInit() {

    this.ingredients = this.store.select('shoppingList')
  
    // this.subscription = this.shoppingListService.ingredientsChanged
    // .subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients= ingredients;
    // })
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new shoppingListActions.StartEdit(index));  
  }
}
