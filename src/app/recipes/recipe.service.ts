import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {Headers, Http, Response} from "@angular/http";
import {Subscription, Observable} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

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
  constructor(private http: Http) { }

  getRecipes(){
    return this.recipes;
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeDate() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipe-book-60f8a.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchDate(){
    return this.http.get('https://recipe-book-60f8a.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }

}
