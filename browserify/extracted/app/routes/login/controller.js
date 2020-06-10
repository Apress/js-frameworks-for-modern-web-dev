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
