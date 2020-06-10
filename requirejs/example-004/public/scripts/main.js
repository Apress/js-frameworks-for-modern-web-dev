// configuration
requirejs.config({
  baseUrl: '/scripts',
  paths: {
    jquery: 'vendor/jquery/jquery-2.1.3.min',
    'jquery-all': 'util/jquery-all',
    // giving undrln a module alias
    undrln: 'vendor/undrln/undrln'
  },
  shim: {
    // defining a shim for undrln
    undrln: {
      exports: '_'
    }
  }
});

// kickoff
requirejs(['data/quotes', 'quotes-view'], function (quoteData, quotesView) {
  var groupedQuotes = quoteData.groupByAttribution();
  quotesView.render(groupedQuotes);
});