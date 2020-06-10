'use strict';

module.exports = function asJSON(cb) {
  return function (uri) {
    cb(
      301,
      '',
      {
        'Content-Type': 'text/html',
        'Content-Length': 0,
        'Location': uri
      }
    );
  };
};