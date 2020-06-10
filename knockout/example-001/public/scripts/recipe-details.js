'use strict';
window.RecipeDetails = (function (ko) {

  return {
    create: function (recipe) {
      var viewmodel = {};

      // properties
      viewmodel.title = ko.observable(recipe.title);
      viewmodel.servings = ko.observable(recipe.servings);
      viewmodel.hours = ko.observable(recipe.cookingTime.hours);
      viewmodel.minutes = ko.observable(recipe.cookingTime.minutes);
      viewmodel.ingredients = ko.observableArray(recipe.ingredients);
      viewmodel.instructions = ko.observableArray(recipe.instructions);
      viewmodel.citation = ko.observable(recipe.citation);

      viewmodel.cookingTime = ko.computed(function () {
        return '$1 hours, $2 minutes'
          .replace('$1', this.hours())
          .replace('$2', this.minutes());
      }, viewmodel);

      // methods
      viewmodel.hasCitation = function () {
        return this.citation() !== '';
      };

      viewmodel.update = function (recipe) {
        this.title(recipe.title);
        this.servings(recipe.servings);
        this.hours(recipe.cookingTime.hours);
        this.minutes(recipe.cookingTime.minutes);
        this.ingredients(recipe.ingredients);
        this.instructions(recipe.instructions);
        this.citation(recipe.citation);
      };

      return viewmodel;
    }
  };

}(window.ko));