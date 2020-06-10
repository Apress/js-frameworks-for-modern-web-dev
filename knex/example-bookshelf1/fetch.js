'use strict';

var User = require('./lib/user');

User.where({
    'id': 1
}).fetch().then(function(user) {
    // Individual attributes get be retrieved with the `get` method
    // console.log('first_name', user.get('first_name'));
    console.log(user.toJSON());
    process.exit();
});
