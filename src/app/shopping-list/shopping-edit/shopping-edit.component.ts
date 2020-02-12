import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: true }) slForm: NgForm; 
  subscription: Subscription;
  allowEdit = false;
  editIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.allowEdit = true;
        this.editIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.allowEdit) {
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient)
      this.allowEdit = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.allowEdit = false;
    this.slForm.reset();
  }

  onDelete() {
    if(this.allowEdit) {
      this.shoppingListService.deleteIngredient(this.editIndex);
      this.onClear();
    }
  }
}
