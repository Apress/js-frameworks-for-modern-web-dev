'use strict';

var User = require('./lib/user');

User.forge({
    'first_name': 'Jane',
    'last_name': 'Doe',
    'email': 'jane.doe@mydomain.com'
}).fetch().then(function(user) {

    /* An object containing every attribute / value for
    this model can be retrieved via the 'toJSON' method. */
    console.log(user.toJSON());

}).catch(function(err) {
	console.log(err);
});
