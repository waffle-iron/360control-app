(function () {
    'use strict';

    angular.module('starter')
            .factory('TiersTable', ['TableModuloFactory',
                function (TableModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'tiers';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            nome: 'VARCHAR(500)',
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
                        TableModuloFactory.get(v, function (resp) {
                            if (resp !== null) {
                                resp = services.setImage(resp);
                            }
                            r(resp);
                        });
                    };

                    services.first = function (o, r) {
                        services.setTable();
                        TableModuloFactory.first(o, function (resp) {
                            if (resp !== null) {
                                resp = services.setImage(resp);
                            }
                            r(resp);
                        });
                    };

                    services.all = function (o, r) {
                        services.setTable();
                        TableModuloFactory.all(o, function (resp) {
                            if (resp !== null) {
                                angular.forEach(resp, function (v, k) {
                                    resp[k] = services.setImage(resp[k]);
                                });
                            }
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

                    services.setImage = function (v) {
                        v.url = 'img/' + v.imagem;
                        return v;
                    };

                    return services;
                }
            ]);
})();