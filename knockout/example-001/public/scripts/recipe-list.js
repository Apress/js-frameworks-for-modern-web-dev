'use strict';
window.RecipeList = (function (ko) {

  return {
    create: function (recipes) {
      var viewmodel = {};

      // properties
      viewmodel.recipes = recipes;
      viewmodel.selectedRecipe = ko.observable(recipes[0]);

      // methods
      viewmodel.selectRecipe = function (recipe) {
        this.selectedRecipe(recipe);
      };

      viewmodel.isSelected = function (recipe) {
        return this.selectedRecipe() === recipe;
      };

      return viewmodel;
    }
  };

}(window.ko));