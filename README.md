# itaFrontend

###Description :

It's a simple mobile app based on IONIC (apache-corodova) & AngularJS with ng-cordova developed for "ITA information Trafic Algerie"

facebook group to help people share their positions and traffic status with photo and short message.

this app communicate with a backend PHP app [itaBackend API](https://github.com/abdouMca/itaBackend) 

for saving and receiving collected informations

###How to use

create new ionic project and copy this files to **www** folder and add this cordova plugin

```zsh

cordova plugin add cordova-plugin-camera

cordova plugin add cordova-plugin-file-transfer

cordova plugin add cordova-plugin-geolocation

cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git

```

change the file *js/app.js* and add your google map key

```javascript
.config(['$urlRouterProvider', 'uiGmapGoogleMapApiProvider',function($urlRouterProvider, uiGmapGoogleMapApiProvider){
        $urlRouterProvider.otherwise('/');
        uiGmapGoogleMapApiProvider.configure({
            key: 'Your Key Here'
           // v: '3.17',
           // libraries: 'places',
           // language:'fr'// 
        });
    }])
```


