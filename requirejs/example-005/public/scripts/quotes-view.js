define(['jquery-all', 'quotes-state'],
  function ($, quotesState) {

  var view = {
    ready: _.once(function () {
      view.render();
    }),

    render: function () {
      view.$el.empty();
      var groupedQuotes = quotesState.quotes;
      for (var attribution in groupedQuotes) {
        if (!groupedQuotes.hasOwnProperty(attribution)) continue;
        view.$el.addQuotes(attribution, groupedQuotes[attribution]);
      }
    },

    highlight: function () {
      view.$el.find('.quote')
        .highlight(quotesState.searchTerm);
    }
  };

  view.$el = $('#quotes');

  quotesState.on('init', view.init);
  quotesState.on('quotes:searched', view.highlight);

  return view;
});