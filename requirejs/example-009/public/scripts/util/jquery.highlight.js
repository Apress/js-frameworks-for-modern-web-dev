/**
 * This is a totally cool vendor script that was written
 * before AMD caught on.
 */

function Match(term) {
  this.chars = [];
  this.term = term;
}

Match.prototype.push = function (char) {
  this.chars.push(char);
};

Match.prototype.isMatching = function () {
  return this.term.indexOf(this.toString()) === 0;
};

Match.prototype.isMatch = function () {
  return this.toString() === this.term;
};

Match.prototype.toString = function () {
  return this.chars.join('');
};

function Highlighter(term) {
  this.segments = [];
  this.currentMatch = null;
  this.term = term;
}

Highlighter.prototype.merge = function () {
  if (!this.currentMatch) return;
  this.segments.push(this.currentMatch.toString());
  this.currentMatch = null;
};

Highlighter.prototype.push = function (char) {
  this.currentMatch = (this.currentMatch || new Match(this.term));
  this.currentMatch.push(char);
  if (!this.currentMatch.isMatching()) {
    return this.merge();
  } else if (this.currentMatch.isMatch()) {
    this.segments.push('<span class="highlight">');
    this.merge();
    this.segments.push('</span>');
  }
};

Highlighter.prototype.toString = function () {
  return this.segments.join('');
};

$.fn.highlight = function (term) {
  this.find('.highlight').each(function (i, el) {
    $(el).replaceWith(el.childNodes);
  });

  this.each(function () {
    var $this = $(this);
    var chars = $this.html().split('');
    var highlighter = new Highlighter(term);

    while (chars.length) {
      var char = chars.shift();
      highlighter.push(char);
    }

    $this.html(highlighter.toString());
  });
};