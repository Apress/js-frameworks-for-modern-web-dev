'use strict';

module.exports = function($scope, $log, feeds, me) {

    $scope.me = me;
    $scope.feeds = feeds;

    $log.debug('$scope.me', $scope.me);
    $log.debug('$scope.feeds', $scope.feeds);

};
