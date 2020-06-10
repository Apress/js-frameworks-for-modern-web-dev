'use strict';
var _ = require('underscore');

var cards = [
  {suite: 'Spades', denomination: 'King'},
  {suite: 'Hearts', denomination: '10'},
  {suite: 'Clubs', denomination: 'Ace'},
  {suite: 'Spades', denomination: 'Ace'},
];

var filtered = _.filter(cards, function (card) {
  return card.suite === 'Spades';
});

console.log(filtered);
/*
[
  { suite: 'Spades', denomination: 'King' },
  { suite: 'Spades', denomination: 'Ace' }
]
*/