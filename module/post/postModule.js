/**
 * Created by khaled on 7/28/15.
 */

'use strict';

angular.module('post', ['post.controllers', 'post.services'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('post', {
                url: '/posts',
                templateUrl: 'module/post/view/home.html'
            })
            .state('post.list', {
                url: '/list',
                controller:'PostListController',
                views: {
                    'menuContent': {
                        templateUrl: 'module/post/view/list.html'
                    }
                }
            })

            .state('post.detail', {
                url: '/list/:id',
                controller:'PostDetailController',
                views: {
                    'menuContent': {
                        templateUrl: 'module/post/view/detail.html'
                    }
                }
            })

            .state('post.new', {
                url: '/new',
                views: {
                    'menuContent': {
                        templateUrl: 'module/post/view/new.html'
                    }
                },
                controller:'PostNewController'
            })
        ;
    }]);
