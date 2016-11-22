(function () {
    'use strict';

    angular.module('starter')
            .factory('PdvTable', ['TableModuloFactory', 'ExtraModuloFactory',
                function (TableModuloFactory, ExtraModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'pdv';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            nome: 'VARCHAR(500)',
                            endereco: 'VARCHAR(500)',
                            cidade: 'VARCHAR(500)',
                            telefone: 'VARCHAR(50)',
                            foto: 'TEXT'
                        };
                    };

                    services.populaBase = function () {
                        services.setTable();
                        TableModuloFactory.init(function (r) {
                            for (var i = 1; i <= 9000; i++) {
                                services.setTable();
                                TableModuloFactory.replace({id: i, nome: 'teste ' + i, endereco: 'Rua: Joaquim Francisco Galeano, 109', cidade: 'Ribeirão Preto', telefone: '(16) 99266-0128', foto: 'img/logo.jpg'}, function (r) {});
                            }
                        });
                    };

                    services.drop = function (r) {
                        services.setTable();
                        TableModuloFactory.drop(r);
                    };

                    services.init = function (r) {
                        services.setTable();
                        TableModuloFactory.init(r);
                    };

                    services.create = function (r) {
                        services.setTable();
                        TableModuloFactory.create(r);
                    };

                    services.getColumm = function (r) {
                        services.setTable();
                        TableModuloFactory.getColumm(r);
                    };

                    services.save = function (o, r) {
                        services.setTable();
                        TableModuloFactory.save(o, r);
                    };

                    services.insert = function (o, r) {
                        services.setTable();
                        TableModuloFactory.insert(o, r);
                    };

                    services.replace = function (o, r) {
                        services.setTable();
                        TableModuloFactory.replace(o, r);
                    };

                    services.update = function (o, r) {
                        services.setTable();
                        TableModuloFactory.update(o, r);
                    };

                    services.get = function (v, r) {
                        services.setTable();
                        TableModuloFactory.get(v, function (resp) {
                            resp = ExtraModuloFactory.img(resp, 'foto');
                            r(resp);
                        });
                    };

                    services.first = function (o, r) {
                        services.setTable();
                        TableModuloFactory.first(o, function (resp) {
                            resp = ExtraModuloFactory.img(resp, 'foto');
                            r(resp);
                        });
                    };

                    services.all = function (o, r) {
                        services.setTable();
                        TableModuloFactory.all(o, function (resp) {
                            angular.forEach(resp, function(v, k){
                                resp[k] = ExtraModuloFactory.img(resp[k], 'foto');
                            })
                            r(resp);
                        });
                    };

                    services.deleteAll = function (o, r) {
                        services.setTable();
                        TableModuloFactory.deleteAll(o, r);
                    };

                    services.count = function (r) {
                        services.setTable();
                        TableModuloFactory.count(r);
                    };

                    services.delete = function (c, v, r) {
                        services.setTable();
                        TableModuloFactory.delete(c, v, r);
                    };

                    services.query = function (q, r, p) {
                        services.setTable();
                        TableModuloFactory.query(q, r, p);
                    };

                    return services;
                }
            ]);
})();