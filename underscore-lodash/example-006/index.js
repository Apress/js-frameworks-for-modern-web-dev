'use strict';
var _ = require('underscore');

var airports = [
  {code: 'STL', city: 'St Louis', timeZone: '-6:00'},
  {code: 'SEA', city: 'Seattle', timeZone: '-8:00'},
  {code: 'JFK', city: 'New York', timeZone: '-5:00'}
];

var selected = 'SEA';

var indexed = _.indexBy(airports, 'code');
console.log(indexed);
/*
{
  STL: {code: 'STL', city: 'St Louis', timeZone: '-6:00'},
  SEA: {code: 'SEA', city: 'Seattle', timeZone: '-8:00'},
  JFK: {code: 'JFK', city: 'New York', timeZone: '-5:00'}
}
*/

var timeZone = indexed[selected].timeZone;
console.log(timeZone);
// -8:00