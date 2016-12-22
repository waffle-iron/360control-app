(function () {
    'use strict';

    angular.module('starter')
            .factory('ServicosRespostasTable', ['TableModuloFactory', 'ExtraModuloFactory', 'FileModuloFactory', 'ValidacaoModuloFactory',
                function (TableModuloFactory, ExtraModuloFactory, FileModuloFactory, ValidacaoModuloFactory) {

                    var services = {};

                    services.setTable = function () {
                        TableModuloFactory.table = 'servicos_respostas';
                        TableModuloFactory.campos = {
                            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
                            usuario_id: 'INTEGER(11)',
                            cliente_id: 'INTEGER(11)',
                            servico_id: 'INTEGER(11)',
                            observacao: 'TEXT',
                            pendencia: 'TEXT',
                            fechamento: 'VARCHAR(50)',
                            foto_antes: 'TEXT',
                            foto_depois: 'TEXT',
                            status: 'INTEGER(1)',
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
                        TableModuloFactory.first(o, function (resp) {
                            if (resp !== null) {
                                if (resp.sincronizado > 0) {
                                    resp = ExtraModuloFactory.img(resp, 'foto_antes', 'url_antes');
                                    resp = ExtraModuloFactory.img(resp, 'foto_depois', 'url_depois');
                                    r(resp);
                                } else {
                                    if (resp.foto_antes != '') {
                                        FileModuloFactory.asUrl(resp.foto_antes, function (ret) {
                                            resp['url_antes'] = ret;
                                            if (resp.foto_depois != '') {
                                                FileModuloFactory.asUrl(resp.foto_depois, function (ret) {
                                                    resp['url_depois'] = ret;
                                                    r(resp);
                                                });
                                            } else {
                                                r(resp);
                                            }
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
                            var retorno = [];
                            if (resp !== null) {
                                var t = ValidacaoModuloFactory.count(resp) - 1;
                                angular.forEach(resp, function (v, k) {
                                    if (v.sincronizado > 0) {
                                        v = ExtraModuloFactory.img(v, 'foto_antes', 'url_antes');
                                        v = ExtraModuloFactory.img(v, 'foto_depois', 'url_depois');
                                        retorno.push(v);
                                        if (k >= t) {
                                            r(retorno);
                                        }
                                    } else {
                                        if (v.foto_antes != '') {
                                            FileModuloFactory.asUrl(v.foto_antes, function (ret) {
                                                v['url_antes'] = ret;
                                                if (v.foto_depois != '') {
                                                    FileModuloFactory.asUrl(v.foto_depois, function (ret) {
                                                        v['url_depois'] = ret;
                                                        retorno.push(v);
                                                        if (k >= t) {
                                                            r(retorno);
                                                        }
                                                    });
                                                } else {
                                                    v = ExtraModuloFactory.img(v, 'foto_depois', 'url_depois');
                                                    retorno.push(v);
                                                    if (k >= t) {
                                                        r(retorno);
                                                    }
                                                }
                                            });
                                        } else {
                                            v = ExtraModuloFactory.img(v, 'foto_antes', 'url_antes');
                                            v = ExtraModuloFactory.img(v, 'foto_depois', 'url_depois');
                                            retorno.push(v);
                                            if (k >= t) {
                                                r(retorno);
                                            }
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