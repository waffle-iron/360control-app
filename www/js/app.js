var _debug = true;
var debug = function (val) {
    if (_debug === true) {
        if (angular.isObject(val) !== null) {
            //console.log(JSON.stringify(val));
            console.log(val);
        } else if (angular.isArray(val) !== null) {
            //console.log(JSON.stringify(val));
            console.log(val);
        } else {
            console.log(val);
        }
    }
};
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'angularMoment', 'ngLodash'])
        .constant('Config', {
            url: 'http://45.55.132.186/',
            api: 'api/',
            versaoApp: '01.00.01',
            timeout: 35000,
            database: 'control',
            debug: _debug,
            avisoSemConexao: 'Esta página requiere conexión a Internet para la vista.',
            avisoGpsInattivo: 'Asegúrese de que su GPS está activo y conectado a Internet para llevar a los clientes más cerca de usted.'
        })

        .run(function (NavegacaoModuloFactory, Config, $cordovaDevice, $rootScope, StorageModuloFactory, $ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });

            $rootScope.user = {};
            $rootScope.user = StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user);
            $rootScope.versaoApp = Config.versaoApp;

            $rootScope.setAtualizarUser = function (result) {
                StorageModuloFactory.local.setObject(StorageModuloFactory.enum.user, result);
                var adicionais = function () {
                    document.addEventListener("deviceready", function () {
                        var user = StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user);
                        user = angular.merge(user, {
                            cordova: $cordovaDevice.getCordova(),
                            model: $cordovaDevice.getModel(),
                            platform: $cordovaDevice.getPlatform(),
                            uuid: $cordovaDevice.getUUID(),
                            version: $cordovaDevice.getVersion(),
                            versao_app: Config.versaoApp
                        });
                        StorageModuloFactory.local.setObject(StorageModuloFactory.enum.user, user);
                        $rootScope.user = StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user);
                    }, false);
                }
                adicionais();
                $rootScope.user = StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user);
            };
            
            $rootScope.go = function (url, params) {
                NavegacaoModuloFactory.go(url, params);
            };

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
                    .state('men.pdvs', {
                        url: '/pdvs',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/pdvs.html',
                                controller: 'pdvsCtrl'
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
                    .state('men.logout', {
                        url: '/logout',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/login.html',
                                controller: 'logoutCtrl'
                            }
                        }
                    })
                    .state('men.sincronizacao', {
                        url: '/sincronizacao',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/sincronizacao.html',
                                controller: 'sincronizacaoCtrl'
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
                    .state('men.tiers', {
                        url: '/tiers/:id',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/tiers.html',
                                controller: 'tiersCtrl'
                            }
                        }
                    })
                    ;
            $urlRouterProvider.otherwise('/men/login');
        });