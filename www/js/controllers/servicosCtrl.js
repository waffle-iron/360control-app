angular.module('starter').controller('servicosCtrl', function (moment, $scope, $stateParams, ServicosTable, ServicosRespostasTable, PdvTable, LoadModuloFactory, CameraModuloFactory) {


    LoadModuloFactory.show();
    $scope.id_pdv = $stateParams.id;
    $scope.serve = [];
    $scope.pdv = [];
    $scope.dados = {
        id: '',
        usuario_id: 1,
        cliente_id: $stateParams.id,
        servico_id: $stateParams.tipo,
        observacao: '',
        pendencia: '',
        fechamento: '',
        foto_antes: '',
        foto_depois: '',
        status: 1
    };

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }

        ServicosTable.get($stateParams.tipo, function (r) {
            if (r !== null) {
                $scope.serve = r;
            }
        });

        ServicosRespostasTable.first({where: 'cliente_id = ' + $stateParams.id + ' and servico_id = ' + $stateParams.tipo}, function (r) {
            if (r !== null) {
                $scope.dados = r;
                $scope.dados.fechamento = new Date(moment($scope.dados.fechamento).format('YYYY'), parseInt(moment($scope.dados.fechamento).format('MM')) - 1, moment($scope.dados.fechamento).format('DD'));

            }
            $scope.dados.cliente_id = $stateParams.id;
            $scope.dados.servico_id = $stateParams.tipo;
            LoadModuloFactory.hide();
        });

    });

    $scope.tirarFoto = function (campo) {
        CameraModuloFactory.selecionarFotoFile(function (r) {
            $scope.dados[campo] = r;
        });
    };

    $scope.salvar = function () {
        ServicosRespostasTable.save({
            id: $scope.dados.id,
            usuario_id: $scope.dados.usuario_id,
            cliente_id: $stateParams.id,
            servico_id: $stateParams.tipo,
            observacao: $scope.dados.observacao,
            pendencia: $scope.dados.pendencia,
            fechamento: moment($scope.dados.fechamento).format('YYYY-MM-DD'),
            foto_antes: $scope.dados.foto_antes,
            foto_depois: $scope.dados.foto_depois,
            status: $scope.dados.status
        }, function (r) {
            if (r !== null) {
                $scope.dados = r;
            }
        });
    };

});