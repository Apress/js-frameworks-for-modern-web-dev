'use strict';

var users = {
  '1001': {
    id: 1001,
    firstName: 'Nicholas',
    lastName: 'Cloud'
  },
  '1002': {
    id: 1002,
    firstName: 'Tim',
    lastName: 'Ambler'
  },
  '1003': {
    id: 1003,
    firstName: 'Tony',
    lastName: 'Headrick'
  },
  '1004': {
    id: 1004,
    firstName: 'Bob',
    lastName: 'Yexley'
  },
  '1005': {
    id: 1005,
    firstName: 'Jordan',
    lastName: 'Kasper'
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  users: {
    random: function () {
      var id = getRandomInt(1001, 1006);
      return users[id];
    }
  }
};