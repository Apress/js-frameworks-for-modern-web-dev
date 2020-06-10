define(['data/quotes', 'undrln', 'ventage'],
  function (quoteData, _, Ventage) {

  var state = Ventage.create({
    ready: _.once(function () {
      state.trigger('ready');
    }),

    search: function (searchTerm) {
      state.searchTerm = searchTerm;
      state.trigger('quotes:searched');
    }
  });

  state.searchTerm = '';
  state.quotes = quoteData.groupByAttribution();

  return state;
});