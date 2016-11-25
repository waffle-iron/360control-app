angular.module('starter').controller('tiersCtrl', function ($rootScope, ExtraModuloFactory, FileModuloFactory, $ionicModal, moment, ValidacaoTable, ValidacaoModuloFactory, $scope, $stateParams, TiersItensRespostasTable, TiersItensTable, PdvTable, LoadModuloFactory, CameraModuloFactory) {

    LoadModuloFactory.show();
    $scope.id_pdv = $stateParams.id;
    $scope.pdv = [];
    $scope.dados = [];
    $scope.datalhes_foto = null;

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }

        TiersItensTable.all({where: 'tier_id = ' + $scope.pdv.tier_id}, function (r) {
            if (r !== null) {
                angular.forEach(r, function (v, k) {
                    var d = v;
                    d.TiersItensid = null;
                    d.TiersItensusuario_id = $rootScope.user.id;
                    d.TiersItenscliente_id = $stateParams.id;
                    d.TiersItenstier_id = v.tier_id;
                    d.TiersItenstiers_item_id = v.id;
                    d.TiersItensresposta = null;
                    d.TiersItensfoto = null;
                    d.TiersItensurl = null;
                    d.TiersItenssincronizado = 0;

                    d = ExtraModuloFactory.img(d, 'TiersItensfoto', 'TiersItensurl');

                    TiersItensRespostasTable.first({where: 'cliente_id = ' + $stateParams.id + ' and tiers_item_id = ' + v.id}, function (r) {
                        LoadModuloFactory.show();
                        if (r !== null) {
                            d.TiersItensid = r.id;
                            d.TiersItensusuario_id = r.usuario_id;
                            d.TiersItenscliente_id = r.cliente_id;
                            d.TiersItenstier_id = r.tier_id;
                            d.TiersItenstiers_item_id = r.tiers_item_id;
                            d.TiersItensresposta = parseInt(r.resposta);
                            d.TiersItensfoto = r.foto;
                            d.TiersItensurl = r.url;
                            d.TiersItenssincronizado = r.sincronizado;
                        }
                        $scope.dados.push(d);
                        LoadModuloFactory.hide();
                    });
                });
            } else {
                LoadModuloFactory.hide();
            }
        });
    });

    $scope.tirarFoto = function (l) {
        LoadModuloFactory.show();
        CameraModuloFactory.capturarFotoFile(function (r) {
            FileModuloFactory.asUrl(r, function (ret) {
                l.TiersItensfoto = r;
                l.TiersItensurl = ret;
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

    $scope.fotoGrande = function (l) {
        $scope.datalhes_foto = l.TiersItensurl;
        $scope.modal.show();
    };


    $scope.salvar = function () {
        var t = ValidacaoModuloFactory.count($scope.dados) - 1;

        LoadModuloFactory.show();
        angular.forEach($scope.dados, function (v, k) {
            TiersItensRespostasTable.save({
                id: v.TiersItensid,
                usuario_id: v.TiersItensusuario_id,
                cliente_id: v.TiersItenscliente_id,
                tier_id: v.TiersItenstier_id,
                tiers_item_id: v.TiersItenstiers_item_id,
                resposta: v.TiersItensresposta,
                foto: v.TiersItensfoto,
                sincronizado: 0
            }, function (r) {
                if (r !== null) {
                    $scope.dados[k].TiersItensid = r.id;
                    debug(t);
                    debug(k);
                }
                if (k >= t) {
                    PdvTable.atualizarCor($scope.pdv.id, $scope.pdv.cor);
                    LoadModuloFactory.hide();
                    ValidacaoModuloFactory.alert('Guardado de datos com éxito.');
                }

            });
        });

        ValidacaoTable.save({
            observacao: 'La activación automática',
            usuario_id: $rootScope.user.id,
            cliente_id: $stateParams.id,
            data: moment(new Date()).format('YYYY-MM-DD'),
            ativacao: 1,
            sincronizado: 0
        }, function (r) {

        });

    };

});