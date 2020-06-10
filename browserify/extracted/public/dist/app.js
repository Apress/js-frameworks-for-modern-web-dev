(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/directives/navbar/controller.js":[function(require,module,exports){
'use strict';

module.exports = function($scope, $log, $location, $http, $rootScope, me) {

    $scope.me = me;
    $scope.path = $location.$$path;

    $rootScope.$on('$routeChangeSuccess', function(e, current) {
        $scope.path = $location.$$path;
        $log.debug('Route changed', current);
    });

    $scope.logout = function() {
        $log.debug('Logout');
        $http.delete('/api/v1/sessions')
            .then(function() {
                $rootScope.user_id = null;
                $location.path('/login');
            })
            .catch(function(err) {
            });
    };

};

},{}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/directives/navbar/index.js":[function(require,module,exports){
'use strict';
/* global app */



app.directive('navbar', function() {

    return {
        'restrict': 'E',
        'replace': true,
        'template': "<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#/dashboard\">Feed Reader</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\">\n        <li ng-class=\"{ 'active': path === '/dashboard' }\"><a href=\"#/dashboard\">Dashboard</a></li>\n        <li ng-class=\"{ 'active': path === '/feeds' }\"><a href=\"#/feeds\">Feeds</a></li>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"dropdown\">\n          <a  class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><span ng-bind=\"me.$object.first_name\"></span> <span ng-bind=\"me.$object.last_name\"></span> <span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a ng-click=\"logout()\">Sign Out</a></li>\n          </ul>\n        </li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n",
        'scope': {},
        'controller': require('./controller')
    };

});

},{"./controller":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/directives/navbar/controller.js"}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/index.js":[function(require,module,exports){
'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var _ = window._ = require('./utils');
require('jquery.cookie');
require('bootstrap-sass');
var angular = require('angular');

require('angular-route');
require('angular-sanitize');
require('restangular');

var app = window.app = module.exports = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'restangular'
]);

var extras = ({"routes":({"dashboard":(function () {var f = require("./routes/dashboard/index.js");f["index"]=require("./routes/dashboard/index.js");return f;})(),"feeds":(function () {var f = require("./routes/feeds/index.js");f["index"]=require("./routes/feeds/index.js");return f;})(),"login":(function () {var f = require("./routes/login/index.js");f["index"]=require("./routes/login/index.js");return f;})()}),"directives":({"navbar":(function () {var f = require("./directives/navbar/index.js");f["index"]=require("./directives/navbar/index.js");return f;})()}),"services":({"me":(function () {var f = require("./services/me/index.js");f["index"]=require("./services/me/index.js");return f;})()})});

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

},{"./directives/navbar/index.js":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/directives/navbar/index.js","./routes/dashboard/index.js":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/dashboard/index.js","./routes/feeds/index.js":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/feeds/index.js","./routes/login/index.js":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/login/index.js","./services/me/index.js":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/services/me/index.js","./utils":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/utils/index.js","angular":false,"angular-route":false,"angular-sanitize":false,"bootstrap-sass":false,"jquery":false,"jquery.cookie":false,"restangular":false}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/dashboard/controller.js":[function(require,module,exports){
'use strict';

module.exports = function($scope, $log, feeds, me) {

    $scope.me = me;
    $scope.feeds = feeds;

    $log.debug('$scope.me', $scope.me);
    $log.debug('$scope.feeds', $scope.feeds);

};

},{}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/dashboard/index.js":[function(require,module,exports){
'use strict';



module.exports = {
    'route': '/dashboard',
    'config': {
        'controller': require('./controller'),
        'template': "<div>\n\n    <div class=\"panel panel-default welcome-panel\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">Dashboard</h3>\n        </div>\n        <div class=\"panel-body\">\n            <p>Welcome back, {{me.first_name}}.</p>\n        </div>\n    </div>\n\n</div>\n",
        'resolve': {
            'feeds': function(Restangular) {
                return Restangular.all('feeds').getList();
            }
        }
    }
};

},{"./controller":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/dashboard/controller.js"}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/feeds/controller.js":[function(require,module,exports){
'use strict';

var _ = require('utils');

module.exports = function($scope, $log, feeds, me) {

    $scope.me = me;
    $scope.feeds = feeds;
    $scope.selectedFeed = null;
    $scope.articles = null;

    $scope.$watch('selectedFeed', function(feed) {
        if (!feed) return;
        $log.debug('Feed selected', feed);
        feed
            .all('articles')
            .getList()
            .then(function(articles) {
                $log.debug('Fetched articles', articles);
                $scope.articles = articles;
            });
    });

    $scope.select = function(feed) {
        $scope.selectedFeed = feed;
    };

    $scope.$watch('feeds', function(feeds) {
        if (feeds.length && !$scope.selectedFeed) {
            $scope.selectedFeed = feeds[0];
        }
    });

};

},{"utils":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/utils/index.js"}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/feeds/index.js":[function(require,module,exports){
'use strict';



module.exports = {
    'route': '/feeds',
    'config': {
        'controller': require('./controller'),
        'template': "<div class=\"row\">\n\n    <div class=\"col-xs-4\">\n\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title\">Feeds</h3>\n            </div>\n            <div class=\"list-group\">\n                <a ng-repeat=\"feed in feeds\" class=\"list-group-item\" ng-class=\"{ 'active': selectedFeed.id === feed.id }\" ng-bind=\"feed.name\" ng-click=\"select(feed)\"></a>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"col-xs-8\">\n\n        <div class=\"panel panel-default feed-article\" ng-repeat=\"article in articles\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title\" ng-bind=\"article.title\"></h3>\n            </div>\n            <div class=\"panel-body\" ng-bind-html=\"article.content\">\n            </div>\n        </div>\n\n    </div>\n\n</div>\n",
        'resolve': {
            'feeds': function(Restangular) {
                return Restangular.all('feeds').getList();
            }
        }
    }
};

},{"./controller":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/feeds/controller.js"}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/login/controller.js":[function(require,module,exports){
'use strict';
/* global $ */

module.exports = function($scope, $log, $location, $rootScope, Restangular) {

    if ($.cookie('user_id')) {
        return $location.path('/dashboard');
    }

    $scope.model = {
        'email': 'john.doe@localhost.site',
        'password': '123abc'
    };

    $scope.submit = function() {
        console.log($scope.model);
        Restangular.all('sessions')
            .post($scope.model)
            .then(function(result) {
                $rootScope.signedIn = true;
                console.log('result', result);
                $location.path('/dashboard');
            });
    };

};

},{}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/login/index.js":[function(require,module,exports){
'use strict';



module.exports = {
    'route': '/login',
    'config': {
        'controller': require('./controller'),
        'template': "<div>\n\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">Feed Reader</h3>\n        </div>\n        <div class=\"panel-body\">\n\n            <form name=\"loginForm\" ng-submit=\"submit()\">\n                <div class=\"form-group\">\n                    <label>Email Address</label>\n                    <input type=\"email\" class=\"form-control\" placeholder=\"Email\" ng-model=\"model.email\" required>\n                </div>\n                <div class=\"form-group\">\n                    <label>Password</label>\n                    <input type=\"password\" class=\"form-control\" placeholder=\"Password\" ng-model=\"model.password\" required>\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\">Sign In</button>\n            </form>\n\n        </div>\n    </div>\n\n</div>\n",
        'resolve': {
            'me': null
        }
    }
};

},{"./controller":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/routes/login/controller.js"}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/services/me/index.js":[function(require,module,exports){
'use strict';
/* global app */

app.factory('me', function(Restangular) {
    return Restangular.one('me').get();
});

},{}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/utils/index.js":[function(require,module,exports){
'use strict';

var _ = require('lodash');
_.mixin(require('underscore.string'));
_.mixin(require('lodash-deep'));
module.exports = _;

},{"lodash":false,"lodash-deep":false,"underscore.string":false}]},{},["/Users/tim/repos/pro-javascript-frameworks/code/browserify/extracted/app/index.js"]);
