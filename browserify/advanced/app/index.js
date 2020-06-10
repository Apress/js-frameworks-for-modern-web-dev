'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var _ = window._ = require('./utils');
require('jquery.cookie');
require('bootstrap-sass');
var angular = require('angular');
var bulk = require('bulk-require');
require('angular-route');
require('angular-sanitize');
require('restangular');

var app = window.app = module.exports = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'restangular'
]);

var extras = bulk(__dirname, [
    'routes/**/index.js',
    'directives/**/index.js',
    'services/**/index.js'
]);

app.config(function($routeProvider, $httpProvider, RestangularProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    RestangularProvider.setDefaultHttpFields({
        'withCredentials': true
    });

    RestangularProvider.setBaseUrl('http://localhost:8000/api/v1');

    var defaultRoute = 'login';

    _.each(extras.routes, function(route, route_name) {
        route.config.resolve = route.config.resolve || {};
        if (_.isUndefined(route.config.resolve.me)) {
            route.config.resolve.me = function(me) {
                return me;
            }
        } else if (!route.config.resolve.me) {
            delete route.config.resolve.me;
        }
        $routeProvider.when(route.route, route.config);
    });

    $routeProvider.otherwise({
        'redirectTo': defaultRoute
    });

});

app.run(function($log, $rootScope, $location) {

    $log.debug('App is running.');

    $rootScope.$on('$routeChangeStart', function(next, current) {
        $rootScope.user_id = $.cookie('user_id');
        $log.debug('current route', current);
        $log.debug('next route', next);
    });

    $rootScope.$on('$routeChangeError', function(e, current, prev, rejection) {
        $log.debug('Route change error', {
            'e': e,
            'current': current,
            'prev': prev,
            'rejection': rejection
        });
        $.removeCookie('user_id', {
            'path': '/'
        });
        $location.path('/login');
        _.defer($rootScope.$apply.bind($rootScope));
    });

});
