/**
 * Created by khaled on 7/28/15.
 */

'use strict';

angular.module('app', ['app.services', 'app.controllers'])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'module/app/view/home.html',
                abstract: true
            })

            .state('home.map', {
                url: '',
                controller:'MapSituationController',
                views: {
                    'tab-map': {
                        templateUrl: 'module/map/view/map.html'
                    }
                }
            })

            .state('home.position', {
                url: '/position',
                views: {
                    'tab-position': {
                        templateUrl: 'module/app/view/position.html'
                    }
                }
            })

            .state('home.feedback', {
                url: '/feedback',
                views: {
                    'tab-feedback': {
                        templateUrl: 'module/app/view/feedback.html'
                    }
                }
            })
        ;


    }]);