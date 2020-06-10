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
          .replace('$1', viewmodel.hours())
          .replace('$2', viewmodel.minutes());
      });

      viewmodel.previousState = null;
      viewmodel.isEditing = ko.observable(false);
      viewmodel.isEditing.subscribe(function (isEditing) {
        if (isEditing) return;
        // force refresh
        viewmodel.instructions.valueHasMutated();
        viewmodel.ingredients.valueHasMutated();
      });

      viewmodel.servingSizes = [
        {text: 'one', numeral: 1},
        {text: 'two', numeral: 2},
        {text: 'three', numeral: 3},
        {text: 'four', numeral: 4},
        {text: 'five', numeral: 5},
        {text: 'six', numeral: 6},
        {text: 'seven', numeral: 7},
        {text: 'eight', numeral: 8},
        {text: 'nine', numeral: 9},
        {text: 'ten', numeral: 10}
      ];

      // methods
      viewmodel.hasCitation = function () {
        return viewmodel.citation() !== '';
      };

      viewmodel.update = function (recipe) {
        viewmodel.isEditing(false);
        viewmodel.title(recipe.title);
        viewmodel.servings(recipe.servings);
        viewmodel.hours(recipe.cookingTime.hours);
        viewmodel.minutes(recipe.cookingTime.minutes);
        viewmodel.ingredients(recipe.ingredients);
        viewmodel.instructions(recipe.instructions);
        viewmodel.citation(recipe.citation);
      };

      viewmodel.edit = function () {
        viewmodel.previousState = ko.mapping.toJS(viewmodel);
        viewmodel.isEditing(true);
      };

      viewmodel.save = function () {
        // TODO save recipe
        viewmodel.isEditing(false);
      };

      viewmodel.cancelEdit = function () {
        viewmodel.isEditing(false);
        ko.mapping.fromJS(viewmodel.previousState, {}, viewmodel);
      };

      return viewmodel;
    }
  };

}(window.ko));