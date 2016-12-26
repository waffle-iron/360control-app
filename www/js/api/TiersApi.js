angular.module('starter')
        .factory('TiersApi', ['RequestModuloFactory',
            function (RequestModuloFactory) {

                var services = {};

                services.index = function (options, retorno) {
                    options.limit = 1000;
                    RequestModuloFactory.get('tiers/index.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;
            }
        ]);
