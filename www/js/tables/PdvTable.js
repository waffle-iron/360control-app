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
                            tier_id: 'VARCHAR(11)',
                            canal_id: 'VARCHAR(11)',
                            carta_acordo: 'VARCHAR(11)',
                            regional_id: 'VARCHAR(11)',
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
                        services.query('SELECT MAX(status) as status FROM servicos_respostas WHERE cliente_id = ' + id + ' ORDER BY status ASC limit 1', function (r) {
                            if (r !== null) {
                                var len = r.rows.length;
                                if (len > 0) {
                                    var v = r.rows.item(0);

                                    cor = v.status;
                                    debug('v.status');
                                    debug(v.status);

                                }

                                services.query('UPDATE pdv SET cor=' + cor + ' WHERE id = ' + id, function (r) {

                                }, []);
                            }
                        }, []);
                    };

                    services.setColor = function (v) {
                        debug('services.setColor');
                        debug(v.cor);
                        v.styleColor = 'preto';
                        if (v.cor == 1) {
                            v.styleColor = 'verde';
                        } else if (v.cor == 2) {
                            v.styleColor = 'amarelo';
                        } else if (v.cor == 3) {
                            v.styleColor = 'vermelho';
                        }
                        v.url = 'img/p' + v.tier_id + '.png';
                        return v;
                    };

                    return services;
                }
            ]);
})();