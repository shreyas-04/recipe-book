import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: true }) slForm: NgForm; 
  subscription: Subscription;
  allowEdit = false;
  editedItem: Ingredient;

  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedingredientIndex > -1){
        this.allowEdit = true;
        this.editedItem = stateData.editedingredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.allowEdit = false
      }
    })
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.allowEdit) {
      // this.shoppingListService.updateIngredient(this.editIndex, newIngredient)
      this.store.dispatch(new shoppingListActions.UpdateIngredient(newIngredient));
      // this.store.dispatch( new shoppingListActions.StopEdit());
      this.allowEdit = false;
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient))
    }
    this.slForm.reset();
  }

  onClear() {
    this.allowEdit = false;
    this.slForm.reset();
    this.store.dispatch( new shoppingListActions.StopEdit());
  }

  onDelete() {
    if(this.allowEdit) {
      this.store.dispatch(new shoppingListActions.DeleteIngredient());
      // this.shoppingListService.deleteIngredient(this.editIndex);
      this.onClear();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch( new shoppingListActions.StopEdit());
  }
}
