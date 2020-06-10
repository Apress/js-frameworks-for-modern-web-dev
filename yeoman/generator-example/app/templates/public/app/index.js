'use strict';
/* global angular */

var _ = require('lodash');
var bulkRequire = require('bulk-require');

var app = angular.module('app', [
    'ngRoute'
]);

var routes = bulkRequire(__dirname, ['routes/**/index.js']).routes;

app.config(function($routeProvider) {

    _.each(routes, function(config) {
        $routeProvider.when(config.route, config);
    });

    $routeProvider.otherwise({
        'redirectTo': '/dashboard'
    });

});
