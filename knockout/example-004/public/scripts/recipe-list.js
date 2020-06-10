'use strict';
window.RecipeList = (function (ko) {

  return {
    create: function (recipes, bus) {
      var viewmodel = {};

      // properties
      viewmodel.recipes = ko.observableArray(recipes);
      viewmodel.selectedRecipe = ko.observable(recipes[0]);

      // methods
      viewmodel.selectRecipe = function (recipe) {
        viewmodel.selectedRecipe(recipe);
      };

      viewmodel.isSelected = function (recipe) {
        return viewmodel.selectedRecipe() === recipe;
      };

      bus.subscribe(function (updatedRecipe) {

        var recipes = viewmodel.recipes();
        var i = 0,
          count = recipes.length;
        while (i < count) {
          if (recipes[i].id !== updatedRecipe.id) {
            i += 1;
            continue;
          }
          recipes[i] = updatedRecipe;
          viewmodel.recipes(recipes);
          viewmodel.selectRecipe(recipes[i]);
          break;
        }

      }, null, 'recipe.persisted');

      return viewmodel;
    }
  };

}(window.ko));