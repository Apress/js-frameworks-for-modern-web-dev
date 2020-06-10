'use strict';
/* global app */

app.factory('me', function(Restangular) {
    return Restangular.one('me').get();
});
