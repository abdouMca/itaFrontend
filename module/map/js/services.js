/**
 * Created by khaled on 7/28/15.
 */
'use strict';

angular.module('map.services', [])

    // position service to get different positions and add new ones  
    .factory('positionService', ['endPointService', '$http', function (endPointService, $http) {

        var positions = {
            list: [],

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
                    data: ObjecttoParams(position),
                    headers: {'Content-Type': 'multipart/form-data'}
                }).success(function (response) {
                    console.log(response);
                    console.log('data sent');
                });
            }
        };

        function ObjecttoParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
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
            'energized',
            'balanced',
            'assertive'
        ];

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
                        console.log('log position here');
                        console.log(position.latitude);
                        return position;
                    }, function (err) {
                        console.log(err);
                        return err;
                    });
            }
        };

    }])
;