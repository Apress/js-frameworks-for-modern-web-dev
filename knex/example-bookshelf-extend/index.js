'use strict';

var User = require('./lib/user');
User.where({
    'id': 1
}).fetch().then(function(user) {
    user.foo();
}).catch(function(err) {
    console.log(err);
}).finally(process.exit);
