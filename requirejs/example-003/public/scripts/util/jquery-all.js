define(['jquery'], function ($) {

  $.fn.addQuotes = function (attribution, quotes) {
    var $section = $('<section></section>')
      .addClass('multiquote')
      .appendTo(this);

    $('<h2></h2>')
      .addClass('attribution')
      .text(attribution)
      .appendTo($section);

    $.each(quotes, function (index, quote) {
      var $blockquote = $('<blockquote></blockquote>')
        .addClass('quote');
      $.each(quote.split('\n'), function (index, paragraph) {
        $('<p></p>').text('"' + paragraph.trim() + '"')
          .appendTo($blockquote);
      });
      $section.append($blockquote);
    });

    return $section;
  };

  return $;
  // or
  // return $.noConflict(true);
});