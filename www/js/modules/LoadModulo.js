angular.module('starter')
        .factory('LoadModuloFactory',
                function ($ionicLoading) {

                    var services = {};

                    services.show = function () {
                        debug('open load');
                        $ionicLoading.show({
                            template: '<div><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><div class="padding-top">Aguarde ...</div></div>'
                        }).then(function () {
                        });
                    };
                    services.hide = function () {
                        debug('close load');
                        $ionicLoading.hide().then(function () {
                        });
                    };
                    return services;
                }
        );