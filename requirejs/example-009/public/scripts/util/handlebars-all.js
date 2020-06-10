define(['Handlebars'], function (Handlebars) {
  Handlebars.registerHelper('explode', function (context, options) {
    var delimiter = options.hash.delim || '';
    var parts = context.split(delimiter);
    var processed = '';
    while (parts.length) {
      processed += options.fn(parts.shift().trim());
    }
    return processed;
  });
  return Handlebars;
});