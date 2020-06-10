'use strict';
var _ = require('underscore');

var boardGame = {
  name: 'Settlers of Catan',
  designer: 'Klaus Teuber',
  numPlayers: [3, 4],
  yearPublished: 1995,
  ages: '10+',
  playTime: '90min',
  subdomain: ['Family', 'Strategy'],
  category: ['Civilization', 'Negotiation'],
  website: 'http://www.catan.com'
};

var picked = _.pick(boardGame, function (value, key, object) {
  return Array.isArray(value);
});

console.log(picked);
/*
{
  numPlayers: [ 3, 4 ],
  subdomain: [ 'Family', 'Strategy' ],
  category: [ 'Civilization', 'Negotiation' ]
}
*/