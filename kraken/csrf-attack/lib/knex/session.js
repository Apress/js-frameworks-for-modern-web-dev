'use strict';

var session = require('express-session');
var KnexSessionStore = require('connect-session-knex')(session);

module.exports = new KnexSessionStore({
    'knex': require('./')
});
