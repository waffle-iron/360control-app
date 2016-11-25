angular.module('starter').controller('sincronizacaoCtrl', function ($rootScope, ExtraModuloFactory, $timeout, $scope, LoadModuloFactory, PdvTable, PdvsApi, ValidacaoModuloFactory, TiersItensRespostasTable, TiersItensRespostasApi, FileModuloFactory, ServicosRespostasTable, ServicosRespostasApi) {

    var seq = 1;

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
        }
    };

    TiersItensRespostasTable.all({where: 'sincronizado = 0'}, function (resp) {
        $scope.registro.tiers.total = ValidacaoModuloFactory.count(resp);
        $scope.registro.tiers.concluido = $scope.registro.tiers.total > 0 ? false : true;
        angular.forEach(resp, function (v, k) {
            TiersItensRespostasApi.save(v, function (r) {
                if (ValidacaoModuloFactory.isOk(r.status)) {
                    FileModuloFactory.remove(v.foto, function (e) {
                        TiersItensRespostasTable.save({id: v.id, sincronizado: 1, foto: r.data.response.result.url}, function (retorno) {
                            $scope.registro.tiers.processado++;
                            $scope.registro.tiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.tiers.total, $scope.registro.tiers.processado);
                        });
                    });
                }
            });
        });

    });

    ServicosRespostasTable.all({where: 'sincronizado = 0'}, function (resp) {
        $scope.registro.servicos.total = ValidacaoModuloFactory.count(resp);
        $scope.registro.servicos.concluido = $scope.registro.servicos.total > 0 ? false : true;
        angular.forEach(resp, function (v, k) {
            debug(v);
            ServicosRespostasApi.save(v, function (r) {
                if (ValidacaoModuloFactory.isOk(r.status)) {
                    FileModuloFactory.remove(v.foto_antes, function (e) {
                        FileModuloFactory.remove(v.foto_depois, function (e) {
                            ServicosRespostasTable.save({id: v.id, sincronizado: 1, foto_antes: r.data.response.result.url_antes, foto_depois: r.data.response.result.url_depois}, function (retorno) {
                                $scope.registro.servicos.processado++;
                                $scope.registro.servicos.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.servicos.total, $scope.registro.servicos.processado);
                            });
                        });
                    });
                }
            });
        });

    });

    PdvTable.all({where: 'sincronizado = 0'}, function (resp) {
        $scope.registro.pdv.total = ValidacaoModuloFactory.count(resp);
        $scope.registro.pdv.concluido = $scope.registro.pdv.total > 0 ? false : true;
        angular.forEach(resp, function (v, k) {
            debug(v);
            PdvsApi.edit(v.id, v, function (r) {
                if (ValidacaoModuloFactory.isOk(r.status)) {
                    PdvTable.save({id: v.id, sincronizado: 1}, function (retorno) {
                        $scope.registro.pdv.processado++;
                        $scope.registro.pdv.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.pdv.total, $scope.registro.pdv.processado);
                    });
                }
            });
        });

    });

    LoadModuloFactory.show();

    $scope._atualizar = function () {
        $timeout(function () {
            $scope._hide();
        }, 5000);
    };

    $scope._hide = function () {
        $scope.registro.pdv.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.pdv.total, $scope.registro.pdv.processado);
        if ($scope.registro.pdv.concluido === false) {
            $scope.registro.pdv.porcentagem = $scope.registro.pdv.porcentagem == 100 ? true : false;
        }
        $scope.registro.servicos.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.servicos.total, $scope.registro.servicos.processado);
        if ($scope.registro.servicos.concluido === false) {
            $scope.registro.servicos.porcentagem = $scope.registro.servicos.porcentagem == 100 ? true : false;
        }
        $scope.registro.tiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.tiers.total, $scope.registro.tiers.processado);
        if ($scope.registro.tiers.concluido === false) {
            $scope.registro.tiers.porcentagem = $scope.registro.tiers.porcentagem == 100 ? true : false;
        }
        LoadModuloFactory.hide();
        LoadModuloFactory.show();
        if ($scope.registro.pdv.concluido === true && $scope.registro.servicos.concluido === true && $scope.registro.tiers.concluido === true) {
            LoadModuloFactory.hide();
            ValidacaoModuloFactory.alert('Parabéns! Los datos enviados com éxito.');
        } else {
            $scope._atualizar();
        }
    };
    $scope._atualizar();


});