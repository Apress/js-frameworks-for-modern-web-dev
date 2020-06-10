'use strict';
var _ = require('underscore');

var boardGames = [
  {title: 'Ticket to Ride', minPlayers: 2, playTime: 45},
  {title: 'Pandemic', minPlayers: 2, playTime: 60},
  {title: 'Munchkin Deluxe', minPlayers: 2, playTime: 45}
];

var filtered = _.where(boardGames, {
  minPlayers: 2,
  playTime: 45
});

console.log(filtered);
/*
[
  { title: 'Ticket to Ride', minPlayers: 2, playTime: 45 },
  { title: 'Munchkin Deluxe', minPlayers: 2, playTime: 45 }
]
*/