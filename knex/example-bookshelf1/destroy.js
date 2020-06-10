'use strict';

var User = require('./lib/user');

User.forge({
    'first_name': 'Jane',
    'last_name': 'Doe',
    'email': 'jane.doe@mydomain.com'
}).save().then(function(user) {
    console.log('User created:');
    console.log(JSON.stringify(user.toJSON(), null, 4));
    return user.destroy();
}).then(function() {
    console.log('User destroyed.');
}).catch(function(err) {
	console.log(err);
});
