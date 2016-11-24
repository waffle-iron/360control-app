(function () {
    'use strict';

    angular.module('starter')
            .factory('TiersItensRespostasTable', ['TableModuloFactory', 'ExtraModuloFactory', 'FileModuloFactory',
                function (TableModuloFactory, ExtraModuloFactory, FileModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'tiers_itens_respostas';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            usuario_id: 'INTEGER(11)',
                            cliente_id: 'INTEGER(11)',
                            tier_id: 'INTEGER(11)',
                            tiers_item_id: 'INTEGER(11)',
                            resposta: 'VARCHAR(500)',
                            foto: 'VARCHAR(500)',
                            sincronizado: 'INTEGER(1)'
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
                        TableModuloFactory.get(v, function (resp) {
                            if (resp !== null) {
                                if (resp.sincronizado > 0) {
                                    resp = ExtraModuloFactory.img(resp, 'foto', 'url');
                                    r(resp);
                                } else {
                                    if (resp.foto != '') {
                                        FileModuloFactory.asUrl(resp.foto, function (ret) {
                                            resp['url'] = ret;
                                            r(resp);
                                        });
                                    } else {
                                        r(resp);
                                    }
                                }
                            } else {
                                r(resp);
                            }
                        });
                    };

                    services.first = function (o, r) {
                        services.setTable();
                        TableModuloFactory.first(o, function (resp) {
                            if (resp !== null) {
                                if (resp.sincronizado > 0) {
                                    resp = ExtraModuloFactory.img(resp, 'foto', 'url');
                                    r(resp);
                                } else {
                                    if (resp.foto != '') {
                                        FileModuloFactory.asUrl(resp.foto, function (ret) {
                                            resp['url'] = ret;
                                            r(resp);
                                        });
                                    } else {
                                        r(resp);
                                    }
                                }
                            } else {
                                r(resp);
                            }
                        });
                    };

                    services.all = function (o, r) {
                        services.setTable();
                        TableModuloFactory.all(o, function (resp) {
                            if (resp !== null) {
                                var t = resp.length - 1;
                                var s = 0;
                                angular.forEach(resp, function (v, k) {
                                    if (resp[k].sincronizado > 0) {
                                        resp[k] = ExtraModuloFactory.img(resp[k], 'foto', 'url');
                                        if (t >= s) {
                                            r(resp);
                                        }
                                        s++;
                                    } else {
                                        if (resp[k].foto != '') {
                                            FileModuloFactory.asUrl(resp[k].foto, function (ret) {
                                                resp[k]['url'] = ret;
                                                if (t >= s) {
                                                    r(resp);
                                                }
                                                s++;
                                            });
                                        } else {
                                            if (t >= s) {
                                                r(resp);
                                            }
                                            s++;
                                        }
                                    }
                                });
                            } else {
                                r(resp);
                            }
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