/**
 * Created by khaled on 7/28/15.
 */


angular.module('map.controllers', [])
    .controller('MapLocateController', ['$scope', '$cordovaCamera', '$cordovaGeolocation',
        function ($scope, $cordovaCamera, $cordovaGeolocation) {


            // geolocation
            $scope.map = {
                center: {
                    latitude: 38.897677,
                    longitude: -77.036530
                },
                zoom: 15,
                disableDefaultUI: false,
                draggable: false,
                scaleControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.marker = {};


            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    $scope.marker.latitude = position.coords.latitude;
                    $scope.marker.longitude = position.coords.longitude;
                    $scope.map.center = $scope.marker;
                }, function (err) {
                    console.log(err);
                });

            //Pictures
            var options = {
                quality: 50
            };
            $scope.picture = '';
            $scope.takePicture = function () {
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    //var image = document.getElementById('myImage');
                    $scope.picture = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    // error
                });
            };

        }])


    //Home Map page show marker and situation
    .controller('MapSituationController', ['$scope', 'positionService', 'uiGmapIsReady',
        function ($scope, positionService, uiGmapIsReady) {

            $scope.bounds = positionService.bounds;
            $scope.pos = positionService.getAll();

            for(var i=0; i < $scope.pos.length; i++){
                $scope.pos[i].icon = 'img/marker/'+$scope.pos[i].status+'.png';
            }
            console.log($scope.pos);

            $scope.windowOptions = {
                visible :false
            };
            $scope.onClick = function() {
                $scope.windowOptions.visible = !$scope.windowOptions.visible;
            };

            $scope.closeClick = function() {
                $scope.windowOptions.visible = false;
            };

            // geolocation
            $scope.map = {
                center: {
                    latitude: 36.711929,
                    longitude: 3.115517
                },
                zoom: 12,
                disableDefaultUI: false,
                draggable: false,
                scaleControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            uiGmapIsReady.promise(1).then(function (instances) {
                instances.forEach(function (inst) {
                    var map = inst.map;
                    map.fitBounds($scope.bounds);
                });
            });

        }])
;
