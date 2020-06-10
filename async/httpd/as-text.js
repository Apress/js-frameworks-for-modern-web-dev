'use strict';

module.exports = function asText(cb) {
  return function (statusCode, payload) {
    cb(
      statusCode,
      payload.toString(),
      {'Content-Type': 'text/plain'}
    );
  };
};