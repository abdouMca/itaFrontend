/**
 * Created by khaled on 7/28/15.
 */
'use strict';

angular.module('map.services', [])

    // position service to get different positions and add new ones  
    .factory('positionService', ['endPointService', '$http', '$cordovaFileTransfer',
        function (endPointService, $http, $cordovaFileTransfer) {

            var positions = {
                list: [],

                centerCoordinate: {
                    latitude: 36.4025514,
                    longitude: 3.5601134
                },

                getAll: function () {
                    return $http({
                        method: "get",
                        url: endPointService.listPosition
                    });
                },

                getPosition: function (id) {
                    return this.list[0];
                },

                newPosition: function (position) {
                    console.log(position);
                    console.log(endPointService.newPosiotn);
                    console.log('data sent');

                    $http({
                        method: "post",
                        url: endPointService.newPosiotn,
                        data: endPointService.ObjectToParams(position),
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).success(function (response) {
                        console.log(response);
                        console.log('data sent');
                    });
                },

                sendDataWithImage: function upload(image, position) {

                    console.info(JSON.stringify(position));

                    var options = {
                        fileKey: "file",
                        fileName: "image.jpg",
                        chunkedMode: false,
                        mimeType: "image/jpeg",
                        params: position
                    };
                    return $cordovaFileTransfer.upload(endPointService.newPosiotn, image, options)
                        .then(function (result) {
                            // Success!
                            console.info('success');
                            console.error(JSON.stringify(options));
                            console.error(JSON.stringify(result));
                            return result;


                        }, function (err) {
                            // Error
                            console.info(JSON.stringify(err));
                        }, function (progress) {
                            // constant progress updates
                            console.info(JSON.stringify(progress));
                            return progress;
                        });

                }

            };

            var markers = positions.list;
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                var latlng = new google.maps.LatLng(markers[i].marker.latitude, markers[i].marker.longitude);
                bounds.extend(latlng);
            }
            ;

            bounds.northeast = bounds.Ca;
            bounds.southwest = bounds.Ia;
            // console.log(bounds);

            positions.bounds = bounds;

            //get status color ( red , green, yellow)
            positions.colorStatus = [
                'balanced',
                'energized',
                'assertive'
            ];

            function calcRoute(start, end, directionsDisplay, directionsService) {

                /*
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                directionsDisplay.setMap(map);
                */


                console.log(start);
                console.log(end);

                var origin = new google.maps.LatLng(start.latitude, start.longitude);
                var finish = new google.maps.LatLng(end.k, end.D);

                console.log(origin);
                console.log(finish);

                var request = {
                    origin: origin,
                    destination: finish,
                    travelMode: google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });

            }

            positions.getDirection = calcRoute;


            return positions;

        }])

    // geoLocation service to get current coordinates of devices
    .factory('geoLocationService', ['$cordovaGeolocation', function ($cordovaGeolocation) {

        var Options = {
            timeout: 10000,
            enableHighAccuracy: true
        };

        return {
            getCurrentPostion: function () {
                return $cordovaGeolocation.getCurrentPosition(Options)
                    .then(function (position) {
                        return position;
                    }, function (err) {
                        console.log(err);
                        return err;
                    });
            }
        };

    }])
;