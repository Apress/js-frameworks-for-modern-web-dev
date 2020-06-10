'use strict';

var User = require('./lib/user');

User.forge({
    'first_name': 'Jane',
    'last_name': 'Doe',
    'email': 'jane.doe@hotmail.com'
}).save().then(function(user) {
	console.log('User saved', user.toJSON());
}).catch(function(err) {
	console.log(err);
}).finally(process.exit);
