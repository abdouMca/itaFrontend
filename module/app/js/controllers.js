/**
 * Created by khaled on 7/28/15.
 */


angular.module('app.controllers', [])

    .controller('ContactController', ['$scope', '$state', 'contactService', '$timeout',
        function ($scope, $state, contactService, $timeout) {

            $scope.sendMessage = function (msg) {
                console.log(msg);
                var message = angular.copy(msg);
                contactService.sendMessage(message)
                    .then(function (data) {
                        console.log(data);
                        $state.go('success');
                    }, function (err) {
                        console.log('error :');
                        console.log(err);
                    });
            };

            $timeout(function(){
                console.log('progress launched');
            }, 1000);

        }])
;

