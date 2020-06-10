'use strict';
var _ = require('underscore');

var BOARD_TILES = {
  IND_AVE: 'Indiana Avenue',
  BOARDWALK: 'Boardwalk',
  MARV_GARD: 'Marvin Gardens',
  PK_PLACE: 'Park Place'
};

var propertyNames = _.values(BOARD_TILES);

console.log(propertyNames);
// [ 'Indiana Avenue', 'Boardwalk', 'Marvin Gardens', 'Park Place' ]