import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {Headers, Http, Response} from "@angular/http";
import {Subscription, Observable} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Pizza','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  ','http://thewebminer.com/blog/wp-content/uploads/2015/08/pizza-1.jpg',[
      new Ingredient('tablespoons sugar', 2),
      new Ingredient('tablespoon kosher salt', 1),
      new Ingredient('tablespoon pure olive oil', 1),
      new Ingredient('cup warm water', 0.75),
      new Ingredient('cups bread flour', 2),
      new Ingredient('teaspoon instant yeast', 1),
      new Ingredient('teaspoons olive oil', 2)
    ]),
    new Recipe('Burger','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  ','http://static.communitytable.parade.com/wp-content/uploads/2013/08/Blue-Cheese-Bacon-Stuffed-Burger-1240.jpg',[
      new Ingredient('cup warm water', 0.75),
      new Ingredient('cups bread flour', 2),
      new Ingredient('teaspoon instant yeast', 1),
      new Ingredient('teaspoons olive oil', 2),
      new Ingredient('tablespoons sugar', 2)
    ]),
    new Recipe('Chicken','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  ','https://www.easy-chicken.com/stat/img/1280/023HoneyLimeChickenSkewers.jpg',[
      new Ingredient('Hot Chocolate', 4),
      new Ingredient('Fresh Milk', 1),
      new Ingredient('cup warm water', 0.75),
      new Ingredient('cups bread flour', 2),
      new Ingredient('teaspoon instant yeast', 1)
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

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipe-book-60f8a.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData(){
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
