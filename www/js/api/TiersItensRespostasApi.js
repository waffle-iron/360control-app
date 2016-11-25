angular.module('starter')
        .factory('TiersItensRespostasApi', ['RequestModuloFactory',
            function (RequestModuloFactory) {

                var services = {};

                services.save = function (options, retorno) {
                    RequestModuloFactory.post('tiers-itens-respostas/save.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;
                
            }
        ]);
