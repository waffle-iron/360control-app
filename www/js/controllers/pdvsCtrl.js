angular.module('starter').controller('pdvsCtrl', function ($rootScope, ExtraModuloFactory, $timeout, $scope, LoadModuloFactory, PdvTable, PdvsApi, ValidacaoModuloFactory, ServicosTable, ServicosApi, TiersItensApi, TiersItensTable) {

    var seq = 1;

    $scope.registro = {
        pdv: {
            nome: "PDV's",
            total: 0,
            processado: 0,
            porcentagem: 0
        },
        servicos: {
            nome: "Servicos",
            total: 0,
            processado: 0,
            porcentagem: 0
        },
        tiers: {
            nome: "Itens e Tiers",
            total: 0,
            processado: 0,
            porcentagem: 0
        }
    };

    LoadModuloFactory.show();

    $scope.replace = function (dados) {
        angular.forEach(dados, function (v, k) {
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

    ServicosApi.index({}, function (r) {
        if (ValidacaoModuloFactory.isParcial(r.status)) {
            $scope.registro.servicos.total = r.data.response.paging.count;
            angular.forEach(r.data.response.result, function (v, k) {
                ServicosTable.replace(v, function (r) {
                    $scope.registro.servicos.processado += 1;
                    $scope.registro.servicos.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.servicos.total, $scope.registro.servicos.processado);
                });
            });

        }
    });

    TiersItensApi.index({}, function (r) {
        if (ValidacaoModuloFactory.isParcial(r.status)) {
            $scope.registro.tiers.total = r.data.response.paging.count;
            angular.forEach(r.data.response.result, function (v, k) {
                TiersItensTable.replace(v, function (r) {
                    $scope.registro.tiers.processado += 1;
                    $scope.registro.tiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.tiers.total, $scope.registro.tiers.processado);
                });
            });

        }
    });

    $scope._atualizar = function () {
        $timeout(function () {
            $scope._hide();
        }, 5000);
    };

    $scope._hide = function () {
        $scope.registro.pdv.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.pdv.total, $scope.registro.pdv.processado);
        $scope.registro.servicos.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.servicos.total, $scope.registro.servicos.processado);
        $scope.registro.tiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.tiers.total, $scope.registro.tiers.processado);
        LoadModuloFactory.hide();
        LoadModuloFactory.show();
        if ($scope.registro.pdv.porcentagem >= 100 && $scope.registro.servicos.porcentagem >= 100 && $scope.registro.tiers.porcentagem >= 100) {
            LoadModuloFactory.hide();
        } else {
            $scope._atualizar();
        }
    };
    $scope._atualizar();
    $scope.loadPdvs();

});