(function () {
    'use strict';

    angular.module('starter')
            .factory('TiersItensTable', ['TableModuloFactory',
                function (TableModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'tiers_itens';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            tier_id: 'INTEGER(11)',
                            iten_id: 'INTEGER(11)',
                            quantidade: 'INTEGER(3)',
                            canal_id: 'INTEGER(3)',
                            status: 'INTEGER(1)',
                            item: 'VARCHAR(500)',
                            tier: 'VARCHAR(500)',
                            imagem: 'VARCHAR(500)'
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