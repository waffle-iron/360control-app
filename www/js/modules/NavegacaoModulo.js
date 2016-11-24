angular.module('starter')
        .factory('NavegacaoModuloFactory',
                function ($state) {

                    var services = {
                        enum: {
                            login: 'men.login',
                            home: 'men.home'
                        }
                    };

                    services.go = function (url, params) {
                        params = angular.merge({}, params);
                        $state.go(url, params);
                    };

                    return services;
                }
        );