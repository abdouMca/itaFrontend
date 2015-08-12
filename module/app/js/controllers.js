/**
 * Created by khaled on 7/28/15.
 */


angular.module('app.controllers', [])

    .controller('ContactController', ['$scope', '$state', 'contactService', '$timeout', '$cordovaProgress',
        function ($scope, $state, contactService, $timeout, $cordovaProgress) {

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
                $cordovaProgress.showBar(true, 50000);
                console.log('progress launched');
            }, 1000);

        }])
;

