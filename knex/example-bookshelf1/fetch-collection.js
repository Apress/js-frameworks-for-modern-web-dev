'use strict';

var User = require('./lib/user');

User.where({
    'last_name': 'Doe'
}).fetchAll().then(function(users) {
    console.log(JSON.stringify(users.toJSON(), null, 4));
}).finally(process.exit);
