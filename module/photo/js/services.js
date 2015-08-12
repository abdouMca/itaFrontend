/**
 * Created by khaled on 7/28/15.
 */
'use strict';

angular.module('photo.services', [])
    .factory('photoService', ['$cordovaCamera', '$ionicPlatform',

        function ($cordovaCamera, $ionicPlatform) {
            var picture = '';
            return {
                takePicture: function () {
                    var options = {
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        encodingType: Camera.EncodingType.JPEG
                    };
                    return $cordovaCamera.getPicture(options).then(function (imageData) {
                        return "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        return err;
                    });
                },
                getPictureUrl: function () {

                    var options = {
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: CameraPopoverOptions
                    };
                    return $cordovaCamera.getPicture(options).then(function (imageData) {
                        return imageData;
                    }, function (err) {
                        return err;
                    });

                }
            };
        }])
;