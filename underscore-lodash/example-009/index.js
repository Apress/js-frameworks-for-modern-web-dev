'use strict';
var _ = require('underscore');

var guesses = [
  {who: 'Mrs. Peacock', where: 'Lounge', what: 'Revolver'},
  {who: 'Professor Plum', where: 'Study', what: 'Dagger'},
  {who: 'Miss Scarlet', where: 'Ballroom', what: 'Candlestick'},
  {who: 'Reverend Green', where: 'Conservatory', what: 'Dagger'}
];

var result = _.find(guesses, function (guess) {
  return guess.where === 'Ballroom';
});

console.log(result);
// { who: 'Miss Scarlet', where: 'Ballroom', what: 'Candlestick' }

result = _.findWhere(guesses, {what: 'Dagger'});

console.log(result);
// { who: 'Professor Plum', where: 'Study', what: 'Dagger' }