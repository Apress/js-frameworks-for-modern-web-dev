define(['util/dom'], function (dom) {
  var quotesEl = dom.querySelector('#quotes');

  function toElement (attribution, quotes) {
    var sectionEl = dom.createElement('section');
    sectionEl.className = 'multiquote';

    var attributionEl = dom.createElement('h2');
    attributionEl.className = 'attribution';
    attributionEl.innerText = attribution;
    sectionEl.appendChild(attributionEl);

    quotes.forEach(function (quote) {
      var quoteEl = dom.createElement('blockquote'),
        paragraphEl = null;
      quote.split('\n').forEach(function (paragraph) {
        paragraphEl = dom.createElement('p');
        paragraphEl.innerText = '"' + paragraph.trim() + '"';
        quoteEl.appendChild(paragraphEl);
      });
      quoteEl.className = 'quote';
      sectionEl.appendChild(quoteEl);
    });

    return sectionEl;
  }

  return {
    render: function (groupedQuotes) {
      for (var attribution in groupedQuotes) {
        if (!groupedQuotes.hasOwnProperty(attribution)) continue;
        var quotes = groupedQuotes[attribution];
        var element = toElement(attribution, quotes);
        quotesEl.appendChild(element);
      }
    }
  };
});