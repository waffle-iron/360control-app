angular.module('starter')
        .factory('ServicosRespostasApi', ['RequestModuloFactory',
            function (RequestModuloFactory) {

                var services = {};

                services.save = function (options, retorno) {
                    RequestModuloFactory.post('servicos-respostas/save.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;
                
            }
        ]);
