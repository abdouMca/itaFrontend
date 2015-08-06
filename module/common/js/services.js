/**
 * Created by khaled on 7/28/15.
 */
'use strict';

angular.module('common.services', [])


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

                    }
                };
            }])

        .factory('fileTrasnfertService', ['$cordovaFileTransfer', 'endPointService',
            function ($cordovaFileTransfer, endPointService) {
                
                var option = {};
                var server = endPointService.newPosiotn;

                return {
                    filePath:'',
                    upload : function(filePath){
                        $cordovaFileTransfer.upload(server, filePath, option)
                            .then(function(result){
                                return result;
                            }, function(err){
                                console.log(err);
                            }

                            ,function(progress){
                                console.log(progress);
                                return progress;
                            })
                    }
                };

            }])
        ;