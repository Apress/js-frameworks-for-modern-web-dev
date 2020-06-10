/**
 * undrln (c) 2015 l33th@x0r
 * MIT license.
 * v0.0.0.0.1-alpha-DEV-theta-r2
 */
(function () {

  var undrln = window._ = {};

  undrln.groupBy = function (collection, key) {
    var groupedElements = {};
    if (collection.length === 0) {
      return groupedElements;
    }
    var index = 0,
      maxIndex = Math.max(collection.length - 1, 0);
    while (index <= maxIndex) {
      var item = collection[index];
      var value = item[key];
      groupedElements[value] =
        (groupedElements[value] || [])
          .concat(item);
      index += 1;
    }
    return groupedElements;
  };

  undrln.filter = function (collection, predicate) {
    var results = [];
    if (collection.length === 0) {
      return results;
    }
    var item;
    var index = 0,
      maxIndex = Math.max(collection.length - 1, 0);
    while (index <= maxIndex) {
      item = collection[index];
      if (predicate(item)) {
        results.push(item);
      }
      index += 1;
    }
    return results;
  };

  undrln.contains = function (collection, value) {
    return collection.indexOf(value) >= 0;
  };

  undrln.once = function (fn, context) {
    var hasBeenCalled = false;
    return function onceProxy () {
      hasBeenCalled = true;
      fn.apply(context || null, arguments);
    };
  };

  undrln.debounce = function (fn, duration, context) {
    var lastCallAt = 0;
    return function debounceProxy () {
      var thisCallAt = (new Date()).getTime();
      var elapsed = thisCallAt - lastCallAt;
      if (lastCallAt === 0 || elapsed > duration) {
        lastCallAt = thisCallAt;
        return fn.apply(context || null, arguments);
      }
    };
  };

}());