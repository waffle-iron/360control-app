angular.module('starter').controller('validaciNCtrl', function ($rootScope, $scope, $stateParams, ValidacaoTable, ValidacaoModuloFactory, LoadModuloFactory, moment, PdvTable) {
    LoadModuloFactory.show();
    $scope.id_pdv = $stateParams.id;
    $scope.dados = {
        id: null,
        observacao: '',
        usuario_id: $rootScope.user.id,
        cliente_id: $stateParams.id,
        data: '',
        ativacao: 0
    };

    $scope.pdv = [];

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }

        ValidacaoTable.first({where: 'usuario_id = ' + $rootScope.user.id + ' AND cliente_id = ' + $stateParams.id}, function (r) {
            if (r !== null) {
                $scope.dados = r;
                $scope.dados.ativacao = ($scope.dados.ativacao == 1 ? true : false);
                $scope.dados.data = new Date(moment($scope.dados.data).format('YYYY'), parseInt(moment($scope.dados.data).format('MM')) - 1, moment($scope.dados.data).format('DD'));
            }
            LoadModuloFactory.hide();
        });

    });

    $scope.salvar = function () {
        LoadModuloFactory.show();
        debug($scope.dados);
        ValidacaoTable.save({
            id: $scope.dados.id,
            observacao: $scope.dados.observacao,
            usuario_id: parseInt($scope.dados.usuario_id),
            cliente_id: parseInt($scope.dados.cliente_id),
            data: moment($scope.dados.data).format('YYYY-MM-DD'),
            ativacao: parseInt($scope.dados.ativacao === true ? 1 : 0),
            sincronizado: 0
        }, function (r) {
            if (r !== null) {
                $scope.dados.id = r.id;
                debug($scope.dados);
                LoadModuloFactory.hide();
                ValidacaoModuloFactory.alert('Datos de guardado correctamente.');
            } else {
                ValidacaoModuloFactory.alert('Error al guardar los datos, vuelva a intentarlo.');
            }
            
        });
    };

});