// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('main', ['ionic', 'uiGmapgoogle-maps', 'ngCordova' , 'post', 'map'])

    .config(['$urlRouterProvider', 'uiGmapGoogleMapApiProvider',function($urlRouterProvider, uiGmapGoogleMapApiProvider){
        $urlRouterProvider.otherwise('/');

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCavNvapehlPoN1VeNI4ti2ZPGHF0aqkrU'
            //v: '3.17',
            //libraries: 'weather,geometry,visualization'
        });
    }])

    .run(function ($ionicPlatform, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });
