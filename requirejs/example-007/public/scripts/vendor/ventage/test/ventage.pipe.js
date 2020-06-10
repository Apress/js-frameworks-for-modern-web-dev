/*global define, chai, setup, suite, test*/
define(['ventage'], function (Ventage) {
  'use strict';
  var assert = chai.assert;

  suite('Ventage#pipe()', function () {
    setup(function (done) {
      done();
    });

    test('creates a callback handler', function (done) {
      var ventage1 = new Ventage();
      var ventage2 = new Ventage();
      var callbackHandle = ventage1.pipe('foo', ventage2);
      assert.isFunction(callbackHandle);
      assert.lengthOf(ventage1._handlers, 1);
      done();
    });

    test('triggers a piped event', function (done) {
      var ventage1 = new Ventage();
      var ventage2 = new Ventage();
      ventage2.on('foo', function () {
        done();
      });
      ventage1.pipe('foo', ventage2);
      ventage1.trigger('foo');
    });

    test('passes all arguments to piped event handler', function (done) {
      var ventage1 = new Ventage();
      var ventage2 = new Ventage();
      ventage2.on('foo', function () {
        assert.lengthOf(arguments, 2, 'event args not piped correctly');
        assert.isTrue(arguments[0]);
        assert.isObject(arguments[1]);
        done();
      });
      ventage1.pipe('foo', ventage2);
      ventage1.trigger('foo', true, {});
    });
  });
});