(function () {
    'use strict';

    angular.module('starter')
            .factory('UsuariosTable', ['TableModuloFactory',
                function (TableModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'usuarios';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            nome: 'VARCHAR(500)',
                            cep: 'VARCHAR(500)',
                            endereco: 'VARCHAR(500)',
                            numero: 'VARCHAR(15)',
                            complemento: 'VARCHAR(500)',
                            bairro: 'VARCHAR(500)',
                            cidade: 'VARCHAR(500)',
                            estado: 'VARCHAR(2)',
                            cpf: 'VARCHAR(11)',
                            rg: 'VARCHAR(11)',
                            telefone: 'VARCHAR(15)',
                            celular: 'VARCHAR(15)',
                            email: 'VARCHAR(500)',
                            atividade: 'VARCHAR(500)',
                            preferencias: 'VARCHAR(900)',
                            outros: 'VARCHAR(255)',
                            teste: 'VARCHAR(255)'
                        };

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
                        TableModuloFactory.get(v, r);
                    };

                    services.first = function (o, r) {
                        services.setTable();
                        TableModuloFactory.first(o, r);
                    };

                    services.all = function (o, r) {
                        services.setTable();
                        TableModuloFactory.all(o, r);
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