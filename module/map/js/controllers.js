/**
 * Created by khaled on 7/28/15.
 */


angular.module('map.controllers', [])

    //Home Map page show marker and situation
    .controller('MapSituationController', ['$scope', 'positionService', 'uiGmapIsReady',
        function ($scope, positionService, uiGmapIsReady) {

            $scope.pos = [];
            $scope.bounds = positionService.bounds;
            positionService.getAll().success(function(data){
                console.log('from positionService inside MapSituationController');
                console.log(JSON.stringify(data));
                $scope.pos = data;
                for (var i = 0; i < $scope.pos.length; i++) {
                    $scope.pos[i].icon = 'img/marker/' + $scope.pos[i].status + '.png';
                };
            });

            $scope.windowOptions = {
                visible: false
            };
            $scope.onClick = function () {
                $scope.windowOptions.visible = !$scope.windowOptions.visible;
            };
            $scope.closeClick = function () {
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

     .controller('MapLocateController', ['$scope', 'positionService','photoService', 'geoLocationService',
            function ($scope, positionService, photoService, geoLocationService) {

                // geoLocation
                $scope.map = {
                    center: {
                        latitude: 36.4025514,
                        longitude: 3.5601134
                    },
                    zoom: 8
                };

                //get current position and bind it to $scope.postion
                $scope.position = {};
               
                geoLocationService.getCurrentPostion()
                    .then(function (position) {
                        console.log(position);
                        $scope.position.latitude = position.coords.latitude;
                        $scope.position.longitude = position.coords.longitude;
                        $scope.map.center = $scope.position;                    
                    });

                //Pictures
                $scope.picture = '';
                $scope.takePicture = function () {
                    photoService.takePicture().then(function(imageData){
                        $scope.picture = imageData;
                        console.log(imageData);
                    });
                };

                //send current position to server via  position service
                $scope.newPosition = function(position){
                    console.log(position.latitude);
                    console.log(position.longitude);
                    console.log(position.comment);
                    console.log(position.status);
                   positionService.newPosition(position);
                   $state.go('success');
                };



            }])

    .controller('MapSuccessController', ['$state', '$timeout', function($state, $timeout){

        $timeout(function() {
            $state.go('home.map');
        }, 3000);
        $timeout(function(){
            $state.go('home.map');
        }, 3000)
    }])
;

