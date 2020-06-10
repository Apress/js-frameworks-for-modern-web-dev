/**
 * undrln (c) 2015 l33th@x0r
 * MIT license.
 * v0.0.0.0.1-alpha-DEV-theta-r2
 */
(function () {

  var undrln = window._ = {};

  undrln.groupBy = function (collection, key) {
    var groupedElements = {};
    var index = 0,
      maxIndex = Math.max(collection.length - 1, 0);
    while (index < maxIndex) {
      var item = collection[index];
      var value = item[key];
      groupedElements[value] =
        (groupedElements[value] || [])
          .concat(item);
      index += 1;
    }
    return groupedElements;
  };

}());