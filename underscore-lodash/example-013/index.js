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

var omitted = _.omit(boardGame, 'designer', 'numPlayers',
  'yearPublished', 'ages', 'playTime');

console.log(omitted);
/*
{
  name: 'Settlers of Catan',
  subdomain: [ 'Family', 'Strategy' ],
  category: [ 'Civilization', 'Negotiation' ],
  website: 'http://www.catan.com'
}
*/