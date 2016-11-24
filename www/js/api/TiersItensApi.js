angular.module('starter')
        .factory('TiersItensApi', ['RequestModuloFactory',
            function (RequestModuloFactory) {

                var services = {};

                services.index = function (options, retorno) {
                    options.limit = 1000;
                    RequestModuloFactory.get('tiers-itens/index.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;
            }
        ]);
