angular.module('starter')
        .factory('ServicosApi', ['RequestModuloFactory',
            function (RequestModuloFactory) {

                var services = {};

                services.index = function (options, retorno) {
                    options.limit = 100;
                    RequestModuloFactory.get('servicos/index.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;
            }
        ]);
