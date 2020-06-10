// configuration
requirejs.config({
  baseUrl: '/scripts',
  paths: {
    jquery: 'vendor/jquery/jquery-2.1.3.min',
    'jquery-all': 'util/jquery-all',
    undrln: 'vendor/undrln/undrln',
    ventage: 'vendor/ventage/ventage',
    highlight: 'util/jquery.highlight'
  },
  shim: {
    undrln: {
      exports: '_'
    },
    highlight: {
      deps: ['jquery']
    }
  }
});

// kickoff
requirejs(['jquery-all', 'quotes-view', 'search-view'],
  function ($, quotesView) {
  $(function () {
    quotesView.ready();
  });
});