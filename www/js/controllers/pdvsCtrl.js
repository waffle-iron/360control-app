angular.module('starter').controller('pdvsCtrl', function ($rootScope, NavegacaoModuloFactory, UsuariosApi, CanaisTable, ExtraModuloFactory, $timeout, StorageModuloFactory, moment, ValidacaoTable, ValidacaoApi, $scope, LoadModuloFactory, PdvTable, PdvsApi, ValidacaoModuloFactory, ServicosTable, ServicosApi, TiersItensApi, TiersItensTable, TiersTable, TiersApi) {

    var seq = 1;
    var seq2 = 1;

    $scope.registro = {
        pdv: {
            nome: "PDV's",
            total: 0,
            processado: 0,
            porcentagem: 0,
            concluido: false
        },
        servicos: {
            nome: "Servicios",
            total: 0,
            processado: 0,
            porcentagem: 0,
            concluido: false
        },
        tiers: {
            nome: "Los Productos y Niveles",
            total: 0,
            processado: 0,
            porcentagem: 0,
            concluido: false
        },
        canais: {
            nome: "Canais",
            total: 0,
            processado: 0,
            porcentagem: 0,
            concluido: false
        },
        validacaoDownload: {
            nome: "Validação Baixar",
            total: 0,
            processado: 0,
            porcentagem: 0,
            concluido: false
        },
        listaTiers: {
            nome: "Tiers",
            total: 0,
            processado: 0,
            porcentagem: 0,
            concluido: false
        }
    };

    $scope.replace = function (dados) {
        angular.forEach(dados, function (v, k) {
            v.sincronizado = 1;
            v.cor = v.cor || 0;
            PdvTable.replace(v, function (r) {
                $scope.registro.pdv.processado += 1;
            });
        });
        $scope.registro.pdv.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.pdv.total, $scope.registro.pdv.processado);
        $scope.loadPdvs();
    };

    $scope.loadPdvs = function () {
        PdvsApi.index({page: seq}, function (r) {
            if (ValidacaoModuloFactory.isParcial(r.status)) {
                $scope.registro.pdv.total = r.data.response.paging.count;
                seq += 1;
                $scope.replace(r.data.response.result);
            }
        });
    };

    $scope.vDownload = function () {
        ValidacaoApi.index({page: seq2, data_hora_sincronizacao: null}, function (r) {
            if (ValidacaoModuloFactory.isParcial(r.status)) {
                $scope.registro.validacaoDownload.total = r.data.response.paging.count;
                seq2 += 1;
                $scope.registro.validacaoDownload.concluido = $scope.registro.validacaoDownload.total > 0 ? false : true;
                angular.forEach(r.data.response.result, function (v, k) {
                    var ret = {
                        usuario_id: v.usuario_id,
                        cliente_id: v.cliente_id,
                        observacao: v.observacao,
                        data: moment(v.data || new Date()).format('YYYY-MM-DD'),
                        ativacao: v.ativacao,
                        sincronizado: 1
                    };
                    ValidacaoTable.save(ret, function (r) {
                        $scope.registro.validacaoDownload.processado += 1;
                        $scope.registro.validacaoDownload.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.validacaoDownload.total, $scope.registro.validacaoDownload.processado);
                    });
                });
                $scope.vDownload();
            } else {
                if ($scope.registro.validacaoDownload.total < 1) {
                    $scope.registro.validacaoDownload.concluido = true;
                    $scope.registro.validacaoDownload.porcentagem = 100;
                }
            }
        });
    };

    $scope.loadServicos = function () {
        ServicosApi.index({}, function (r) {
            if (ValidacaoModuloFactory.isParcial(r.status)) {
                $scope.registro.servicos.total = r.data.response.paging.count;
                angular.forEach(r.data.response.result, function (v, k) {
                    ServicosTable.replace(v, function (r) {
                        $scope.registro.servicos.processado += 1;
                        $scope.registro.servicos.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.servicos.total, $scope.registro.servicos.processado);
                    });
                });

            } else {
                if ($scope.registro.servicos.total < 1) {
                    $scope.registro.servicos.concluido = true;
                    $scope.registro.servicos.porcentagem = 100;
                }
            }
        });
    };

    $scope.loadTiers = function () {
        TiersItensApi.index({}, function (r) {
            if (ValidacaoModuloFactory.isParcial(r.status)) {
                $scope.registro.tiers.total = r.data.response.paging.count;
                angular.forEach(r.data.response.result, function (v, k) {
                    TiersItensTable.replace(v, function (r) {
                        $scope.registro.tiers.processado += 1;
                        $scope.registro.tiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.tiers.total, $scope.registro.tiers.processado);
                    });
                });

            } else {
                if ($scope.registro.tiers.total < 1) {
                    $scope.registro.tiers.concluido = true;
                    $scope.registro.tiers.porcentagem = 100;
                }
                ;
            }
        });
    };

    $scope.loadListaTiers = function () {
        TiersApi.index({}, function (r) {
            if (ValidacaoModuloFactory.isParcial(r.status)) {
                $scope.registro.listaTiers.total = r.data.response.paging.count;
                angular.forEach(r.data.response.result, function (v, k) {
                    TiersTable.replace(v, function (r) {
                        $scope.registro.listaTiers.processado += 1;
                        $scope.registro.listaTiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.listaTiers.total, $scope.registro.listaTiers.processado);
                    });
                });

            } else {
                if ($scope.registro.listaTiers.total < 1) {
                    $scope.registro.listaTiers.concluido = true;
                    $scope.registro.listaTiers.porcentagem = 100;
                }
                ;
            }
        });
    };

    $scope.loadCanais = function () {
        UsuariosApi.canais({}, function (r) {
            if (ValidacaoModuloFactory.isParcial(r.status)) {
                $scope.registro.canais.total = r.data.response.paging.count;
                angular.forEach(r.data.response.result, function (v, k) {
                    CanaisTable.replace(v, function (r) {
                        $scope.registro.canais.processado += 1;
                        $scope.registro.canais.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.canais.total, $scope.registro.canais.processado);
                    });
                });

            } else {
                if ($scope.registro.canais.total < 1) {
                    $scope.registro.canais.concluido = true;
                    $scope.registro.canais.porcentagem = 100;
                }
                ;
            }
        });
    };

    $scope._atualizar = function () {
        $timeout(function () {
            $scope._hide();
        }, 5000);
    };

    $scope._hide = function () {

        if ($scope.registro.pdv.concluido === false) {
            $scope.registro.pdv.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.pdv.total, $scope.registro.pdv.processado);
            $scope.registro.pdv.concluido = $scope.registro.pdv.porcentagem >= 100 ? true : false;
        }
        if ($scope.registro.servicos.concluido === false) {
            $scope.registro.servicos.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.servicos.total, $scope.registro.servicos.processado);
            $scope.registro.servicos.concluido = $scope.registro.servicos.porcentagem >= 100 ? true : false;
        }
        if ($scope.registro.tiers.concluido === false) {
            $scope.registro.tiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.tiers.total, $scope.registro.tiers.processado);
            $scope.registro.tiers.concluido = $scope.registro.tiers.porcentagem >= 100 ? true : false;
        }
        if ($scope.registro.listaTiers.concluido === false) {
            $scope.registro.listaTiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.listaTiers.total, $scope.registro.listaTiers.processado);
            $scope.registro.listaTiers.concluido = $scope.registro.listaTiers.porcentagem >= 100 ? true : false;
        }
        if ($scope.registro.canais.concluido === false) {
            $scope.registro.canais.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.canais.total, $scope.registro.canais.processado);
            $scope.registro.canais.concluido = $scope.registro.canais.porcentagem >= 100 ? true : false;
        }

        if ($scope.registro.validacaoDownload.concluido === false) {
            $scope.registro.validacaoDownload.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.validacaoDownload.total, $scope.registro.validacaoDownload.processado);
            $scope.registro.validacaoDownload.concluido = $scope.registro.validacaoDownload.processado >= $scope.registro.validacaoDownload.total ? true : false;
        }

        LoadModuloFactory.hide();
        LoadModuloFactory.show();

        if ($scope.registro.pdv.concluido === true && $scope.registro.servicos.concluido === true && $scope.registro.tiers.concluido === true && $scope.registro.listaTiers.concluido === true && $scope.registro.validacaoDownload.concluido === true && $scope.registro.canais.concluido === true) {
            LoadModuloFactory.hide();
            StorageModuloFactory.local.set(StorageModuloFactory.enum.hasSincronizacao, 0);
            StorageModuloFactory.local.set(StorageModuloFactory.enum.dataUltimaSincronizacao, moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00');
            ValidacaoModuloFactory.alert('Parabéns! Los datos enviados com éxito.');
        } else {
            $scope._atualizar();
        }
    };

    if (StorageModuloFactory.local.get(StorageModuloFactory.enum.hasSincronizacao, 0) === 1) {
        ValidacaoModuloFactory.alert('No es posible descargar los datos, no hay registro que se enviará al servidor.', 'Advertencia!', function (r) {
            NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.enviarDados);
        });
    } else {
        ValidacaoModuloFactory.confirm('Esta operación consume tiempo, confirma la ejecución de la misma.', {}, function (r, ok) {
            if (ok === true) {
                LoadModuloFactory.show();
                $scope._atualizar();
                ServicosTable.resetar(function (r) {
                    $scope.loadServicos();
                });
                TiersItensTable.resetar(function (r) {
                    $scope.loadTiers();
                });
                TiersTable.resetar(function (r) {
                    $scope.loadListaTiers();
                });
                PdvTable.resetar(function (r) {
                    $scope.loadPdvs();
                });
                CanaisTable.resetar(function (r) {
                    $scope.loadCanais();
                });

                $scope.vDownload();
            }
        });
    }


});
