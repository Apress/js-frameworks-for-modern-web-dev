define([], function () {
  var quotes = document.querySelector('#quotes');

  return {
    addQuote: function (text) {
      var quote = document.createElement('blockquote'),
        p = null;
      text.split('\n').forEach(function (paragraph) {
        p = document.createElement('p');
        p.innerHTML = paragraph.trim();
        quote.appendChild(p);
      });
      quote.className = 'quote';
      quotes.appendChild(quote);
    }
  };
});