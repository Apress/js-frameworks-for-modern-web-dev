'use strict';

var Account = require('./lib/account');

Account.where({
    'id': 1
}).fetch({
    'withRelated': ['users']
}).then(function(account) {
    console.log(JSON.stringify(account.toJSON(), null, 4));
}).finally(process.exit);
