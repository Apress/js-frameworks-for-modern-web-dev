(function app ($, ko, RecipeList, RecipeDetails) {

  var getRecipes = $.get('/recipes');

  $(function () {
    getRecipes.then(function (recipes) {
      var list = RecipeList.create(recipes);
      var details = RecipeDetails.create(list.selectedRecipe());

      list.selectedRecipe.subscribe(function (recipe) {
        details.update(recipe);
      });

      ko.applyBindings(list, document.querySelector('#recipe-list'));
      ko.applyBindings(details, document.querySelector('#recipe-details'));

    }).fail(function () {
      alert('No recipes for you!');
    });
  });

}(window.jQuery, window.ko, window.RecipeList, window.RecipeDetails));