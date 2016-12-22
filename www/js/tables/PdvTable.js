(function () {
    'use strict';

    angular.module('starter')
            .factory('PdvTable', ['TableModuloFactory',
                function (TableModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'pdv';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            codigo: 'VARCHAR(500)',
                            nome: 'VARCHAR(500)',
                            endereco: 'VARCHAR(500)',
                            cidade: 'VARCHAR(500)',
                            tier_id: 'VARCHAR(2)',
                            sincronizado: 'INTEGER(1)',
                            cor: 'INTEGER(1)'
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
                                resp = services.setColor(resp);
                            }
                            r(resp);
                        });
                    };

                    services.first = function (o, r) {
                        services.setTable();
                        TableModuloFactory.first(o, function (resp) {
                            if (resp !== null) {
                                resp = services.setColor(resp);
                            }
                            r(resp);
                        });
                    };

                    services.all = function (o, r) {
                        services.setTable();
                        TableModuloFactory.all(o, function (resp) {
                            if (resp !== null) {
                                angular.forEach(resp, function (v, k) {
                                    resp[k] = services.setColor(resp[k]);
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

                    services.atualizarCor = function (id, corAtual) {
                        var cor = 0;
                        if (corAtual < 1) {
                            cor = 1;
                        } else if (corAtual <= 2) {
                            cor = 2;
                        }
                        services.query('UPDATE pdv SET cor=' + cor + ' WHERE id = ' + id, function (r) {

                        }, []);
                    };

                    services.setColor = function (v) {
                        v.styleColor = '';
                        if (v.cor < 1) {
                            v.styleColor = 'preto';
                        } else if (v.cor < 2) {
                            v.styleColor = 'azul';
                        } else {
                            v.styleColor = 'verde';
                        }
                        v.url = 'img/p' + v.tier_id + '.png';
                        return v;
                    };

                    return services;
                }
            ]);
})();