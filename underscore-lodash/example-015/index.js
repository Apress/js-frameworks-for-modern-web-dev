'use strict';
var _ = require('lodash');

/*
Note that lodash, not underscore, is used for
this example. The cloneDeep() function below
is unique to lodash.
*/

var coffeeShops = [
  {name: 'Crooked Tree', hours: [6, 22]},
  {name: 'Picasso\'s Coffee House', hours: [6, 24]},
  {name: 'Sump Coffee', hours: [9, 16]}
];

function whatIsOpen(hour, period) {
  return _.chain(coffeeShops)
    .cloneDeep()                           // #1
    .map(function to12HourFormat (shop) {  // #2
      shop.hours = _.map(shop.hours, function (hour) {
        return (hour > 12 ? hour - 12 : hour);
      });
      return shop;
    })
    .filter(function filterByHour (shop) { // #3
      if (period === 'AM') {
        return shop.hours[0] <= hour;
      }
      if (period === 'PM') {
        return shop.hours[1] >= hour;
      }
      return false;
    })
    .map(function toShopName (shop) {      // #4
      return shop.name;
    })
    .value();                              // #5
}

console.log(whatIsOpen(8, 'AM'));
// [ 'Crooked Tree', 'Picasso\'s Coffee House' ]

console.log(whatIsOpen(11, 'PM'));
// [ 'Picasso\'s Coffee House' ]