/**
 * Created by khaled on 7/28/15.
 */
'use strict';

angular.module('map.services', [])

    .factory('positionService', ['endPointService', '$http', function (endPointService, $http) {

        var positions = {
            list: [],

            getAll: function () {
                return $http({
                    method:"get",
                    url:endPointService.listPosition
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
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
        return positions;

    }])
;