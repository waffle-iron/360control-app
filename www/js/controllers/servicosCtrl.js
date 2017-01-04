angular.module('starter').controller('servicosCtrl', function (StorageModuloFactory, $rootScope, ExtraModuloFactory, $ionicModal, FileModuloFactory, ValidacaoModuloFactory, ValidacaoTable, moment, $scope, $stateParams, ServicosTable, ServicosRespostasTable, PdvTable, LoadModuloFactory, CameraModuloFactory) {


    LoadModuloFactory.show();
    $scope.id_pdv = $stateParams.id;
    $scope.serve = [];
    $scope.pdv = [];
    $scope.datalhes_foto = null;
    $scope.dados = {
        id: '',
        usuario_id: $rootScope.user.id,
        cliente_id: $stateParams.id,
        servico_id: $stateParams.tipo,
        observacao: '',
        pendencia: '',
        fechamento: new Date(moment(new Date()).format('YYYY'), parseInt(moment(new Date()).format('MM')) - 1, moment(new Date()).format('DD')),
        foto_antes: '',
        url_antes: '',
        foto_depois: '',
        url_depois: '',
        status: 0,
        sincronizado: 0
    };

    $scope.dados = ExtraModuloFactory.img($scope.dados, 'foto_antes', 'url_antes');
    $scope.dados = ExtraModuloFactory.img($scope.dados, 'foto_depois', 'url_depois');

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
                $scope.dados = angular.merge({}, $scope.dados, r);
                $scope.dados.fechamento = new Date(moment($scope.dados.fechamento).format('YYYY'), parseInt(moment($scope.dados.fechamento).format('MM')) - 1, moment($scope.dados.fechamento).format('DD'));
            }
            $scope.dados.cliente_id = $stateParams.id;
            $scope.dados.servico_id = $stateParams.tipo;
            LoadModuloFactory.hide();
        });

    });

    $scope.tirarFoto = function (campo1, campo2) {
        LoadModuloFactory.show();
        CameraModuloFactory.capturarFotoFile(function (r) {
            FileModuloFactory.asUrl(r, function (ret) {
                $scope.dados[campo1] = r;
                $scope.dados[campo2] = ret;
                LoadModuloFactory.hide();
            });
        });
    };

    $ionicModal.fromTemplateUrl('my-foto.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.fotoGrande = function (campo2) {
        $scope.datalhes_foto = $scope.dados[campo2];
        $scope.modal.show();
    };

    $scope.salvar = function () {
        LoadModuloFactory.show();
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
            status: $scope.dados.status,
            sincronizado: 0
        }, function (r) {
            if (r !== null) {
                $scope.dados.id = r.id;
                PdvTable.atualizarCor($scope.pdv.id, $scope.pdv.cor);
                ValidacaoTable.save({
                    observacao: 'La activación automática',
                    usuario_id: $rootScope.user.id,
                    cliente_id: $stateParams.id,
                    data: moment(new Date()).format('YYYY-MM-DD'),
                    ativacao: 1,
                    sincronizado: 0
                }, function (r) {
                    LoadModuloFactory.hide();
                    ValidacaoModuloFactory.alert('Guardado de datos com éxito.');
                });
                StorageModuloFactory.local.set(StorageModuloFactory.enum.hasSincronizacao, 1);
            } else {
                LoadModuloFactory.hide();
                ValidacaoModuloFactory.alert('Error al guardar los datos, vuelva a intentarlo.');
            }
        });
    };

});