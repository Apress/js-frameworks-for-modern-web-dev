'use strict';

var users = {
  '1001': {
    id: 1001,
    firstName: 'Nicholas',
    lastName: 'Cloud'
  }
};

// TODO: add all US states
var usStates = ['IL', 'MO'];

module.exports = {
  users: {
    find: function (criteria, cb) {
      cb(null, users[criteria.id]);
    }
  },

  states: {
    all: function (cb) {
      return cb(null, usStates);
    }
  }
};