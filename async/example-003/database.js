'use strict';

var users = {
  '1000': {
    id: 1000,
    firstName: 'Blade',
    lastName: 'Slingshot',
    birthDate: new Date(1980, 0, 1)
  }
};

module.exports = {
  users: {
    find: function (criteria, cb) {
      cb(null, users[criteria.id]);
    }
  }
};