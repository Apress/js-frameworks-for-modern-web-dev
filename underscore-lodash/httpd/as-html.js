'use strict';

module.exports = function asHTML(cb) {
  return function (statusCode, payload) {
    cb(
      statusCode,
      payload.toString(),
      {'Content-Type': 'text/html'}
    );
  };
};