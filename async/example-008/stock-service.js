'use strict';

var symbols = [
  'MSFT', 'AAPL', 'GOOGL', 'RHT'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  refresh: function () {
    return symbols.map(function (symbol) {
      return {
        symbol: symbol,
        price: getRandomInt(50, 1000).toFixed(2)
      };
    });
  }
};