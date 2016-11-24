angular.module('starter')
        .factory('PdvsApi', ['RequestModuloFactory',
            function (RequestModuloFactory) {

                var services = {};

                services.index = function (options, retorno) {
                    options.limit = 250;
                    RequestModuloFactory.get('clientes/index.json', options, function (response) {
                        retorno(response);
                    });
                };

                services.edit = function (id, options, retorno) {
                    options = angular.merge({
                        foto: null,
                        url: null
                    }, options);
                    delete options.foto;
                    delete options.url;
                    RequestModuloFactory.post('clientes/edit/' + id + '.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;
            }
        ]);
