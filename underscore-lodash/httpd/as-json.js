'use strict';

function isString(target) {
  return typeof target === 'string' ||
    target instanceof String;
}

module.exports = function asJSON(cb) {
  return function (statusCode, payload) {
    if (!isString(payload)) {
      payload = JSON.stringify(payload);
    }
    cb(
      statusCode,
      payload,
      {'Content-Type': 'application/json'}
    );
  };
};