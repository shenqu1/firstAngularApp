import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { firebase } from 'src/environments/firebase.environment';
import { Recipe } from '../recipes/recipe.model';



@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(firebase.url, recipes)
            .subscribe((response)=>{
                console.log(response);
            });
    }

    fetchRecipes() {
      this.http.get<Recipe[]>(firebase.url)
      .pipe(map(recipes => {
          return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
      }))
      .subscribe(recipes => {
          this.recipeService.setRecipes(recipes);
      });
    }
}