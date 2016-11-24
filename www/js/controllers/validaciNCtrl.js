angular.module('starter').controller('validaciNCtrl', function ($rootScope, $scope, $stateParams, ValidacaoTable, LoadModuloFactory, moment, PdvTable) {
    LoadModuloFactory.show();
    $scope.id_pdv = $stateParams.id;
    $scope.dados = {
        id: null,
        observacao: '',
        usuario_id: 1,
        cliente_id: 1,
        fechamento: '',
        disponivel: false
    };

    $scope.pdv = [];

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }

        ValidacaoTable.first({where: 'usuario_id = 1 AND cliente_id = ' + $stateParams.id}, function (r) {
            if (r !== null) {
                $scope.dados = r;
                $scope.dados.disponivel = ($scope.dados.disponivel == 1 ? true : false);
                $scope.dados.fechamento = new Date(moment($scope.dados.fechamento).format('YYYY'), parseInt(moment($scope.dados.fechamento).format('MM')) - 1, moment($scope.dados.fechamento).format('DD'));
            }
            LoadModuloFactory.hide();
        });

    });

    $scope.salvar = function () {
        LoadModuloFactory.show();
        console.log($scope.dados);
        ValidacaoTable.save({
            id: $scope.dados.id,
            observacao: $scope.dados.observacao,
            usuario_id: parseInt($scope.dados.usuario_id),
            cliente_id: parseInt($scope.dados.cliente_id),
            fechamento: moment($scope.dados.fechamento).format('YYYY-MM-DD'),
            disponivel: parseInt($scope.dados.disponivel === true ? 1 : 0)
        }, function (r) {
            if (r !== null) {
                $scope.dados.id = r.id;
                console.log($scope.dados);
            }
            LoadModuloFactory.hide();
        });
    };

});