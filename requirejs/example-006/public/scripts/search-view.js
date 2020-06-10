define(['jquery-all', 'undrln', 'quotes-state'],
  function ($, _, quotesState) {

  var view = {
    onSearchChanged: function (e) {
      var term = e.target.value;
      quotesState.search(term);
    }
  };

  view.$el = $('#filter');

  view.$el.on('keyup', '[name="search"]', view.onSearchChanged);

  return view;
});