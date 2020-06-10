'use strict';

var User = require('./lib/user');

User.where({
    'last_name': 'Doe'
}).fetchAll().then(function(users) {
    return users.invokeThen('sendEmail', {
        'subject': 'Congratulations on having such a great name, {{first_name}}.',
        'message': '{{first_name}} really is a great name. Seriously - way to go.'
    });
}).then(function(users) {
    console.log('%s users were complimented on their name.', users.length);
}).finally(process.exit);
