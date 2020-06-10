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
