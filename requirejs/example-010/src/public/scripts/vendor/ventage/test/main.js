/*global requirejs, require, mocha*/
requirejs.config({
  paths: {
    'ventage': '../ventage'
  }
});

require([
  // Events instance methods
  './ventage.ctor.js',
  './ventage.create.js',
  './ventage.on.js',
  './ventage.off.js',
  './ventage.clear.js',
  './ventage.trigger.js',
  './ventage.triggerAsync.js',
  './ventage.pipe.js'
], function () {
  'use strict';
  mocha.checkLeaks();
  mocha.run();
});