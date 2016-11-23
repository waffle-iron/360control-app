var debug = function (str) {
    console.log(JSON.stringify(str));
}
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'angularMoment', 'ngLodash'])
        .constant('Config', {
            //url: 'http://192.168.1.120/homeplay',
            url: 'http://homeplay.agenciavoxel.com.br',
            api: '/',
            timeout: 5000,
            database: 'homeplay',
            appVersion: '00.00.01'
        })

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
            $ionicConfigProvider.backButton.previousTitleText(false);
            $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
            if (ionic.Platform.isAndroid()) {
                $ionicConfigProvider.scrolling.jsScrolling(true);
            }
            $ionicConfigProvider.views.forwardCache(false);
            $ionicConfigProvider.views.maxCache(0);
            $ionicConfigProvider.views.transition('none');
            $stateProvider

                    .state('men', {
                        url: '/men',
                        abstract: true,
                        templateUrl: 'templates/men.html',
                        controller: 'menCtrl'
                    })

                    .state('men.home', {
                        url: '/home',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/home.html',
                                controller: 'homeCtrl'
                            }
                        }
                    })

                    .state('men.login', {
                        url: '/login',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/login.html',
                                controller: 'loginCtrl'
                            }
                        }
                    })

                    .state('men.listaDePDVs', {
                        url: '/listaDePDVs',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/listaDePDVs.html',
                                controller: 'listaDePDVsCtrl'
                            }
                        }
                    })

                    .state('men.checklist', {
                        url: '/checklist/:id',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/checklist.html',
                                controller: 'checklistCtrl'
                            }
                        }
                    })

                    .state('men.editarPDV', {
                        url: '/editarPDV/:id',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/editarPDV.html',
                                controller: 'editarPDVCtrl'
                            }
                        }
                    })

                    .state('men.editarUsuario', {
                        url: '/editarUsuario',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/editarUsuario.html',
                                controller: 'editarUsuarioCtrl'
                            }
                        }
                    })


                    .state('men.servicos', {
                        url: '/servicos/:id/:tipo',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/servicos.html',
                                controller: 'servicosCtrl'
                            }
                        }
                    })


                    .state('men.validaciN', {
                        url: '/validaciN/:id',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/validaciN.html',
                                controller: 'validaciNCtrl'
                            }
                        }
                    })

                    .state('men.registroFotogrFico', {
                        url: '/registroFotogrFico',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/registroFotogrFico.html',
                                controller: 'registroFotogrFicoCtrl'
                            }
                        }
                    })

;
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/men/login');
        });
