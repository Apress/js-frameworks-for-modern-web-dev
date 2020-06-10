/*global define, chai, setup, suite, test*/
define(['ventage'], function (Ventage) {
  'use strict';
  var assert = chai.assert;

  suite('Ventage.create()', function () {
    setup(function (done) {
      done();
    });

    test('create() returns an object that has the same prototype as a normal instance of Ventage', function (done) {
      var instance1 = Ventage.create();
      var instance2 = new Ventage();
      assert.equal(Object.getPrototypeOf(instance1), Object.getPrototypeOf(instance2));
      done();
    });

    test('create() returns an object with specified members', function (done) {
      var api = {
        foo: true,
        bar: function () {},
        baz: 123
      };
      var instance = Ventage.create(api);
      var property;
      for (property in api) {
        if (!api.hasOwnProperty(property)) {
          continue;
        }
        assert.property(instance, property, 'missing property: ' + property);
        assert.equal(instance[property], api[property], 'properties not equal');
      }
      done();
    });

  });
});