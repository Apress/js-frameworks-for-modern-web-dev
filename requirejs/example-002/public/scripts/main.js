// configuration
requirejs.config({
  baseUrl: '/scripts'
});

// kickoff
requirejs(['data/quotes', 'quotes-view'], function (quoteData, quotesView) {
  var groupedQuotes = quoteData.groupByAttribution();
  quotesView.render(groupedQuotes);
});