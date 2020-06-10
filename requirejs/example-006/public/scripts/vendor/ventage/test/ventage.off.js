/*global define, chai, setup, suite, test*/
define(['ventage'], function (Ventage) {
  'use strict';
  var assert = chai.assert;

  suite('Ventage#off()', function () {
    setup(function (done) {
      done();
    });

    test('removes a callback from the instance', function (done) {
      var events = new Ventage();
      var callback = function () {};
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 1);
      events.off('foo', callback);
      assert.lengthOf(events._handlers, 0);
      done();
    });

    test('removes all callbacks registered for an event from the instance', function (done) {
      var events = new Ventage();
      events.on('foo', function () {});
      events.on('foo', function () {});
      events.on('bar', function () {});
      events.on('bar', function () {});
      assert.lengthOf(events._handlers, 4);
      events.off('foo');
      assert.lengthOf(events._handlers, 2);
      done();
    });

    test('removes only callbacks registered with a specific context from the instance', function (done) {
      var context = {};
      var events = new Ventage();
      var callback = function () {};
      events.on('foo', callback, context);
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 2);
      events.off('foo', callback, context);
      assert.lengthOf(events._handlers, 1);
      done();
    });

    test('removes all callbacks', function (done) {
      var context = {};
      var events = new Ventage();
      var callback = function () {};
      events.on('foo', callback, context);
      events.on('foo', callback);
      assert.lengthOf(events._handlers, 2);
      events.off();
      assert.lengthOf(events._handlers, 0);
      done();
    });

    test('piped handler is removed', function (done) {
      var ventage1 = new Ventage();
      var ventage2 = new Ventage();
      var callbackHandle = ventage1.pipe('foo', ventage2);
      ventage1.on('bar', function () {});
      assert.lengthOf(ventage1._handlers, 2);
      ventage1.off('foo', callbackHandle, ventage2);
      assert.lengthOf(ventage1._handlers, 1);
      done();
    });

    test('all piped handles are removed for event + context', function (done) {
      var ventage1 = new Ventage();
      var ventage2 = new Ventage();
      ventage1.pipe('foo', ventage2);
      ventage1.pipe('foo', ventage2);
      ventage1.pipe('foo', ventage2);
      assert.lengthOf(ventage1._handlers, 3);
      ventage1.off('foo', null, ventage2);
      assert.lengthOf(ventage1._handlers, 0);
      done();
    });
  });
});