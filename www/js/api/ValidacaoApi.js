angular.module('starter')
        .factory('ValidacaoApi', ['RequestModuloFactory', 'moment', 'StorageModuloFactory',
            function (RequestModuloFactory, moment, StorageModuloFactory) {

                var services = {};


                services.index = function (options, retorno) {
                    options.limit = 1000;
                    var d = StorageModuloFactory.local.get(StorageModuloFactory.enum.dataUltimaSincronizacao) || new Date();
                    options.data_hora_sincronizacao = moment(d).format('YYYY-MM-DD') + ' 00:00:00';
                    RequestModuloFactory.get('clientes-validacao/index.json', options, function (response) {
                        retorno(response);
                    });
                };


                services.save = function (options, retorno) {
                    RequestModuloFactory.post('clientes-validacao/save.json', options, function (response) {
                        retorno(response);
                    });
                };

                return services;

            }
        ]);
