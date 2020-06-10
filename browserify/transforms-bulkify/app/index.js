'use strict';

var angular = require('angular');
var bulk = require('bulk-require');
var _ = require('lodash');
require('angular-route');

var app = angular.module('app', [
    'ngRoute'
]);

var routes = bulk(__dirname, [
    'routes/**/route.js'
]).routes;

app.config(function($routeProvider) {

    var defaultRoute = 'dashboard';

    _.each(routes, function(route, route_name) {
        route = route.route;
        route.config.resolve = route.config.resolve || {};
        $routeProvider.when(route.route, route.config);
    });

    $routeProvider.otherwise({
        'redirectTo': defaultRoute
    });

});

app.run(function($log, $rootScope, $location, $route) {

    $log.debug('App is running.');

    $rootScope.$on('$routeChangeStart', function(next, current) {
        $log.debug('current route', current);
        $log.debug('next route', next);
    });

    $rootScope.$on('$routeChangeSuccess', function(e, current, prev) {
        $rootScope.currentPath = $location.$$path;
    });

    $rootScope.$on('$routeChangeError', function(e, current, prev, rejection) {
        $location.path('/dashboard');
    });

});
