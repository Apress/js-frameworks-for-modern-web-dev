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
