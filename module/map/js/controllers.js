/**
 * Created by khaled on 7/28/15.
 */

'use strict';

angular.module('map.controllers', [])

    //Home Map page show marker and situation
    .controller('MapSituationController', ['$scope', '$timeout', 'positionService', 'uiGmapIsReady', 'geoLocationService',
        function ($scope, $timeout, positionService, uiGmapIsReady, geoLocationService) {

            $scope.pos = [];
            $scope.bounds = positionService.bounds;
            positionService.getAll()
                .success(function (data) {
                    $scope.pos = data;
                    for (var i = 0; i < $scope.pos.length; i++) {
                        $scope.pos[i].icon = {url: 'img/marker/' + $scope.pos[i].status + '.png'};
                        $scope.pos[i].windowOptions = {
                            visible: false
                        };
                    }
                });

            $scope.markerOption = {
                animation: google.maps.Animation.DROP,
                draggable: false
            };

            $scope.windowOptions = {
                visible: false
            };
            $scope.onClick = function (position) {
                console.log(position);
                position.windowOptions.visible = !$scope.windowOptions.visible;

            };
            $scope.closeClick = function (position) {
                position.windowOptions.visible = false;
            };
            $scope.getStatusColor = function (index) {
                var color = positionService.colorStatus[index];
                return color;
            };

            /* Map */
            $scope.myPosition = {};
            geoLocationService
                .getCurrentPostion()
                .then(function (position) {
                    $scope.myPosition.latitude = position.coords.latitude;
                    $scope.myPosition.longitude = position.coords.longitude;
                }, function (err) {
                    console.log(err);
                });

            $scope.map = {
                center: {
                    latitude: 36.711929,
                    longitude: 3.115517
                },
                zoom: 14
            };
            $scope.mapOptions = {
                disableDefaultUI: false,
                streetViewControl: false,
                scaleControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            //fit mp bounds and get route
            $scope.mapObject = {};
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            uiGmapIsReady.promise(1).then(function (instances) {
                instances.forEach(function (inst) {
                    var map = inst.map;
                    map.fitBounds($scope.bounds);
                    //$scope.mapObject = inst.map;
                    directionsDisplay.setMap(map);
                });
            });

            /* AUTOCOMPLETE */
            $scope.autocompleteoptions = {
                country: 'dz',
                types: '(cities)'
            };
            $scope.autocompletedetail = '';
            $scope.autocompleteresult = '';
            $scope.getRoute = function (result) {

                var location = result.geometry.location;
                console.log(location.k+', '+location.D);
                positionService.getDirection($scope.myPosition, location, directionsDisplay, directionsService);
            };
        }])

    .controller('MapSuccessController', ['$state', '$timeout',
        function ($state, $timeout) {
            $timeout(function () {
                $state.go('home.map');
            }, 3000);
        }])

    .controller('MapLocateController', ['$scope', '$state', 'positionService', 'photoService', 'geoLocationService',
        function ($scope, $state, positionService, photoService, geoLocationService) {

            // geoLocation
            $scope.map = {
                center: positionService.centerCoordinate,
                zoom: 8
            };

            //get current position and bind it to $scope.postion
            $scope.position = {};
            var lockCoordinate = false;
            geoLocationService
                .getCurrentPostion()
                .then(function (position) {
                    $scope.position.latitude = angular.copy(position.coords.latitude);
                    $scope.position.longitude = angular.copy(position.coords.longitude);
                }, function (err) {
                    console.log(err);
                });

            //$scope.$watchCollection('position', function(){
            //   $scope.map.center = $scope.position;
            //});

            //Pictures
            $scope.picture = '';
            $scope.takePicture = function () {
                photoService.getPictureUrl().then(function (imageData) {
                    $scope.picture = imageData;
                    console.log(imageData);
                });
            };

            //send current position to server via  position service
            $scope.newPosition = function (position) {
                //position.image = $scope.picture;
                //positionService.newPosition(position);
                positionService.sendDataWithImage($scope.picture, position)
                $state.go('success');
            };
        }])
;