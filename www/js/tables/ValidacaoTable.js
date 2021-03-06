(function () {
    'use strict';

    angular.module('starter')
            .factory('ValidacaoTable', ['TableModuloFactory', 'ExtraModuloFactory',
                function (TableModuloFactory, ExtraModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'validacao';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            usuario_id: 'INTEGER(11)',
                            cliente_id: 'INTEGER(11)',
                            observacao: 'TEXT',
                            data: 'VARCHAR(50)',
                            ativacao: 'INTEGER(1)',
                            sincronizado: 'INTEGER(1)'
                        };
                    };

                    services.resetar = function (r) {
                        services.setTable();
                        TableModuloFactory.resetar(r);
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
                        services.first({where: 'usuario_id = ' + o.usuario_id + ' AND cliente_id = ' + o.cliente_id}, function (res) {
                            if (res !== null) {
                                o.id = res.id;
                            }
                            services.setTable();
                            TableModuloFactory.save(o, r);
                        });
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