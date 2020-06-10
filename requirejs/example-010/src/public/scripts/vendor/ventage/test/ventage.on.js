/*global define, chai, setup, suite, test*/
define(['ventage'], function (Ventage) {
  'use strict';
  var assert = chai.assert;

  suite('Ventage#on()', function () {
    setup(function (done) {
      done();
    });

    test('adds a callback to the instance', function (done) {
      var events = new Ventage();
      var callback = function () {};
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 1);
      done();
    });

    test('adds a callback with a specific context to the instance', function (done) {
      var context = {};
      var events = new Ventage();
      var callback = function () {};
      events.on('foo', callback, context);
      assert.lengthOf(events._handlers, 1);
      done();
    });

    test('prevents duplicates from being added to an instance', function (done) {
      var context = {};
      var events = new Ventage();
      var callback = function () {};
      events.on('foo', callback, context);
      events.on('foo', callback, context);
      events.on('foo', callback);
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 2);
      done();
    });
  });
});