'use strict';
var _ = require('underscore');

var urls = [
  {scheme: 'http', host: 'underscorejs', domain: '.org'},
  {scheme: 'http', host: 'lodash', domain: '.com'},
  {scheme: 'http', host: 'ecmascript', domain: '.org'},
];

var grouped = _.groupBy(urls, 'domain');
var dotOrgCount = grouped['.org'].length;
console.log(dotOrgCount);
// 2

function toCounts(grouped) {
  var counts = {};
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) {
      counts[key] = grouped[key].length;
    }
  }
  return counts;
}

console.log(toCounts(grouped));
// { '.org': 2, '.com': 1 }