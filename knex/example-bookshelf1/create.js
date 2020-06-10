'use strict';

var User = require('./lib/user');
var user = new User();

user.set({
    'first_name': 'Steve',
    'last_name': 'Taylor',
    'email': 'steve.taylor@mydomain.com'
});

// Individual attributes can also be set as shown below
// user.set('first_name', 'Steve');

user.save().then(function(user) {
	// user has been saved
	console.log('User saved', user.toJSON());
}).catch(function(err) {
	console.log(err);
}).finally(process.exit);
