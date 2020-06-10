'use strict';

var User = require('./lib/user');
User.getRecent().then(function(users) {
    console.log(JSON.stringify(users, null, 4));
}).catch(function(err) {
    console.log(err);
}).finally(process.exit);
