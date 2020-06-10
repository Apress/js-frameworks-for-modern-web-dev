define([
  'quotes-state',
  'jquery-all',
  'handlebars-all',
  'text!templates/header.hbs',
  'i18n!nls/lang'
], function (quotesState, $, Handlebars, headerTemplate, lang) {

  var compiledTemplate = Handlebars.compile(headerTemplate);

  var view = {
    render: function () {
      view.$el.empty();
      view.$el.html(compiledTemplate(lang));
    }
  };

  view.$el = $('#page-title');

  quotesState.on('ready', view.render);

  return view;
});