'use strict';

var User = require('./lib/user');

User.where({
	'id': 1
}).fetch().then(function(user) {
	return user.load('profile');
}).then(function(user) {
    console.log(JSON.stringify(user.toJSON(), null, 4));
    process.exit();
});
