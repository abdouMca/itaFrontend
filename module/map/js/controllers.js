/**
 * Created by khaled on 7/28/15.
 */

angular.module('map.controllers', [])

    //Home Map page show marker and situation
    .controller('MapSituationController', ['$scope', '$timeout', 'positionService', 'uiGmapIsReady',
        function ($scope, $timeout, positionService, uiGmapIsReady) {
            $scope.pos = [];
            $scope.bounds = positionService.bounds;

            $timeout(function () {
                positionService.getAll().success(function (data) {
                    $scope.pos = data;
                    for (var i = 0; i < $scope.pos.length; i++) {
                        $scope.pos[i].animation = google.maps.Animation.DROP;
                        $scope.pos[i].windowOptions = {
                            visible: false
                        };
                    }

                });
            }, 500);


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
               // console.log(color);
                return color;
            };

            // geolocation
            $scope.map = {
                center: {
                    latitude: 36.711929,
                    longitude: 3.115517
                },
                zoom: 14,
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

    .controller('MapSuccessController', ['$state', '$timeout',
        function ($state, $timeout) {
            $timeout(function () {
                $state.go('home.map');
            }, 3000);
        }])

    .controller('MapLocateController', ['$scope', '$state', 'positionService', 'photoService', 'geoLocationService', '$cordovaFileTransfer', 
        function ($scope, $state, positionService, photoService, geoLocationService, $cordovaFileTransfer) {

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


                    console.log('lock is :' +lockCoordinate);
                    console.log('position :')
                    console.log(position);

                    if(!lockCoordinate) {
                        console.log('lock inside :' +lockCoordinate);
                        $scope.position.latitude = angular.copy(position.coords.latitude);
                        $scope.position.longitude = angular.copy(position.coords.longitude);
                        $scope.map.center = $scope.position;
                        lockCoordinate = true;
                    }

                }, function(err){
                    console.log(err);
                });

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