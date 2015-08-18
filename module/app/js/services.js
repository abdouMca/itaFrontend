/**
 * Created by khaled on 7/28/15.
 */


angular.module('app.services', [])
    .constant('END_POINT', 'http://ita.lan/api')
    //.constant('END_POINT', 'http://map-edini.rhcloud.com/api')
    .factory('endPointService', ['END_POINT', function (END_POINT) {
        return {
            listPosition: END_POINT + '/position',
            newPosiotn: END_POINT + '/new-position',
            contact: END_POINT + '/contact',
            ObjectToParams: function (obj) {
                var p = [];
                for (var key in obj) {
                    p.push(key + '=' + encodeURIComponent(obj[key]));
                }
                return p.join('&');
            }
        };
    }])

    .factory('contactService', ['$http', 'endPointService',
        function ($http, endPointService)
        {
            return {
                sendMessage: function (message) {
                    return $http({
                        method: "post",
                        url: endPointService.contact,
                        //data: endPointService.ObjectToParams(message),
                        data: message,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (response) {
                        console.log(response);
                        console.log('data sent');
                    });
                }
            };

        }])
;
