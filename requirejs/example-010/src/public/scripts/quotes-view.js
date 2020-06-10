define([
  'jquery-all',
  'quotes-state',
  'handlebars-all',
  'text!templates/quote.hbs'
],
function ($, quotesState, Handlebars, quotesTemplate) {

  var bindTemplate = Handlebars.compile(quotesTemplate);

  var view = {
    render: function () {
      view.$el.empty();
      var groupedQuotes = quotesState.quotes;
      view.$el.html(bindTemplate(groupedQuotes));
    },

    highlight: function () {
      view.$el.find('.quote')
        .highlight(quotesState.searchTerm);
    }
  };

  view.$el = $('#quotes');

  quotesState.on('quotes:searched', view.highlight);
  quotesState.on('ready', view.render);

  return view;
});