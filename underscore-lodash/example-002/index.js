'use strict';
var _ = require('underscore');

var urls = [
  'http://underscorejs.org',
  'http://lodash.com',
  'http://ecmascript.org'
];

var counts = _.countBy(urls, function byTLD(url) {
  if (url.indexOf('.com') >= 0) {
    return '.com';
  }
  if (url.indexOf('.org') >= 0) {
    return '.org';
  }
  return '?';
});

console.log(counts);
// { '.org': 2, '.com': 1 }