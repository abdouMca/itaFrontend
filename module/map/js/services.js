/**
 * Created by khaled on 7/28/15.
 */
'use strict';

angular.module('map.services',[])

.factory('positionService', [function () {

        var positions = {
            list:[
                {
                    id:1,
                    title:'rop bloqué',
                    status:'2',
                    marker:{
                        latitude:36.628837,
                        longitude:3.4494278
                    }
                },
                {
                    id:2,
                    title:'kheloui',
                    status:'0',
                    marker:{
                        latitude:36.726187,
                        longitude:3.429521
                    }
                },
                {
                    id:3,
                    title:'choya habsa',
                    status:'1',
                    marker:{
                        latitude:36.715273,
                        longitude:3.238367
                    }
                }
            ],
            getAll: function () {
                return this.list;
            },
            getPosition: function (id) {
                return this.list[0];
            }
        };

        var markers = positions.list;
        var bounds = new google.maps.LatLngBounds();
        for (var i=0; i< markers.length; i++) {
            var latlng = new google.maps.LatLng(markers[i].marker.latitude, markers[i].marker.longitude);
            bounds.extend(latlng);
        };

        bounds.northeast = bounds.Ca;
        bounds.southwest = bounds.Ia;
       // console.log(bounds);

        positions.bounds = bounds;
        return positions;

    }])
;