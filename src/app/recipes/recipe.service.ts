import { Injectable } from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('New Recipe','Very nice Very nice Very nice Very nice Very nice  ','http://myrecke.com/wp-content/uploads/2015/09/chicken-biryani.jpg',[
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 3)
    ]),
    new Recipe('Tasty Potatoes','Very nice Very nice Very nice Very nice Very nice ','http://search.chow.com/thumbnail/800/600/www.chowstatic.com/assets/2015/02/31286_RecipeImage_baked_chicken_breast_mustard_sauce.jpg',[
      new Ingredient('Fatouma Pizza', 1),
      new Ingredient('Pasta Meat', 2)
    ]),
    new Recipe('New Chicken','Very nice Very nice Very nice Very nice Very nice ','http://www.thebantingchef.co.za/images/recipes/chicken/fancierfriedchicken.jpg',[
      new Ingredient('Hot Chocolate', 4),
      new Ingredient('Fresh Milk', 1)
    ]),
  ];
  constructor() { }

  getRecipes(){
    return this.recipes;
  }

}
