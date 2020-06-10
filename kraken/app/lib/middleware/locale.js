'use strict';

var acceptLanguage = require('accept-language');

/**
 * Express middleware function that automatically determines locality based on the value
 * of the `accept-language` header.
 */
module.exports = function() {

    return function(req, res, next) {

        // Manually assign Spanish with:
        // res.locals.context = { 'locality': { 'language': 'es', 'country': 'ES' } };

        var locale = acceptLanguage.parse(req.headers['accept-language']);
        if (locale.size) {
            res.locals.context = {
                'locality': { 'language': locale[0].language, 'country': locale[0].region }
            };
            console.log('Set: res.locals.context', res.locals.context);
        }

        next();

    };

};
