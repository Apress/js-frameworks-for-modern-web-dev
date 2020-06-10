define([
  'jquery-all',
  'undrln',
  'quotes-state',
  'handlebars-all',
  'text!templates/search.hbs',
  'i18n!nls/lang'
],
function ($, _, quotesState, Handlebars, searchTemplate, lang) {

  var compiledTemplate = Handlebars.compile(searchTemplate);

  var view = {
    render: function () {
      view.$el.empty();
      view.$el.html(compiledTemplate(lang));
    },

    onSearchChanged: function (e) {
      var term = e.target.value;
      quotesState.search(term);
    }
  };

  view.$el = $('#filter');
  view.$el.on('keyup', '[name="search"]', view.onSearchChanged);

  quotesState.on('ready', view.render);

  return view;
});