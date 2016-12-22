angular.module('starter')
        .factory('UsuariosApi', ['RequestModuloFactory',
            function (RequestModuloFactory) {

                var services = {};

                services.login = function (options, retorno) {
                    RequestModuloFactory.post('usuarios/login.json', options, function (response) {
                        retorno(response);
                    });
                };
                services.validaLogin = function (options, retorno) {
                    RequestModuloFactory.post('usuarios/valida-login.json', options, function (response) {
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
                    RequestModuloFactory.post('usuarios/edit/' + id + '.json', options, function (response) {
                        retorno(response);
                    });
                };
                
                services.canais = function (options, retorno) {
                    options.limit = 1000;
                    RequestModuloFactory.get('usuarios/canais.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;
            }
        ]);
