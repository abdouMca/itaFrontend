/**
 * Created by khaled on 7/28/15.
 */

'use strict';

angular.module('map', ['map.controllers', 'map.services'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('maps', {
                url: '/position',
                templateUrl: 'module/map/view/position.html'
            })
            .state('success',{
            	url:'/success',
            	templateUrl:'module/map/view/success.html'
            })
        ;

    }])
;
