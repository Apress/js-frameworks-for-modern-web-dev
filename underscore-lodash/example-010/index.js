'use strict';
var _ = require('underscore');

var diceRoll = [
  {sides: 6, up: 3},
  {sides: 6, up: 1},
  {sides: 6, up: 5}
];

var allUps = _.pluck(diceRoll, 'up');

console.log(allUps);
// [ 3, 1, 5 ]

var total = allUps.reduce(function (prev, next) {
  return prev + next;
}, 0);

console.log(total);
// 9