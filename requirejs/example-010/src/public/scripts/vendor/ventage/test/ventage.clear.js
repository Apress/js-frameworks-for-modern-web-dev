/*global define, chai, setup, suite, test*/
define(['ventage'], function (Ventage) {
  'use strict';
  var assert = chai.assert;

  suite('Ventage#clear()', function () {
    setup(function (done) {
      done();
    });

    test('clears all callbacks from the instance', function (done) {
      var events = new Ventage();
      var callback = function () {};
      events.on('foo', callback);
      events.on('bar', callback);
      events.on('baz', function () {}, {});
      assert.lengthOf(events._handlers, 3);
      events.clear();
      assert.lengthOf(events._handlers, 0);
      done();
    });
  });
});