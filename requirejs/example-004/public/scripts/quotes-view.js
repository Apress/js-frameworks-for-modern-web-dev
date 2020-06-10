define(['jquery-all'], function ($) {
  var $quotes = $('#quotes');

  return {
    render: function (groupedQuotes) {
      for (var attribution in groupedQuotes) {
        if (!groupedQuotes.hasOwnProperty(attribution)) continue;
        $quotes.addQuotes(attribution, groupedQuotes[attribution]);
      }
    }
  };
});