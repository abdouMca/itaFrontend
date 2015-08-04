/**
 * Created by khaled on 7/28/15.
 */
'use strict';

angular.module('photo.services', [])
    .factory('photoService', ['$cordovaCamera', '$ionicPlatform', function ($cordovaCamera, $ionicPlatform) {


        var picture = '';
        var takePicture;
        $ionicPlatform.ready(function () {
            var options = {
                quality: 50,
                //  destinationType: Camera.DestinationType.DATA_URL,
                //  sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                //encodingType: Camera.EncodingType.JPEG
            };
            takePicture = function () {
                return $cordovaCamera.getPicture(options).then(function (imageData) {
                    //var image = document.getElementById('myImage');
                    return "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    return err;
                });
            };
        });

        return {
            takePicture: takePicture()
        };
    }])
;