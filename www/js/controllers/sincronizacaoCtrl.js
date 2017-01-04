angular.module('starter').controller('sincronizacaoCtrl', function (UsuariosApi, $rootScope, UsuariosApi, moment, ExtraModuloFactory, $timeout, $scope, LoadModuloFactory, PdvTable, PdvsApi, ValidacaoModuloFactory, TiersItensRespostasTable, TiersItensRespostasApi, FileModuloFactory, ServicosRespostasTable, ServicosRespostasApi, ValidacaoApi, ValidacaoTable, StorageModuloFactory) {

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
            nome: "Tiers",
            total: 0,
            processado: 0,
            porcentagem: 0,
            concluido: false
        },
        validacaoUpload: {
            nome: "Carregar Validação",
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
        }
    };

    var processaDados = function () {

        TiersItensRespostasTable.all({where: 'sincronizado = 0'}, function (resp) {
            $scope.registro.tiers.total = ValidacaoModuloFactory.count(resp);
            $scope.registro.tiers.concluido = $scope.registro.tiers.total > 0 ? false : true;
            angular.forEach(resp, function (v, k) {
                console.log(v);
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
                v.fechamento = moment(v.fechamento).format('YYYY-MM-DD');
                debug('ServicosRespostasApi');
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

        ValidacaoTable.all({where: 'sincronizado = 0'}, function (resp) {
            $scope.registro.validacaoUpload.total = ValidacaoModuloFactory.count(resp);
            $scope.registro.validacaoUpload.concluido = $scope.registro.validacaoUpload.total > 0 ? false : true;
            angular.forEach(resp, function (v, k) {
                ValidacaoApi.save(v, function (r) {
                    if (ValidacaoModuloFactory.isOk(r.status)) {
                        var ret = {
                            usuario_id: r.data.response.result.usuario_id,
                            cliente_id: r.data.response.result.cliente_id,
                            observacao: r.data.response.result.observacao,
                            data: moment(r.data.response.result.data || new Date()).format('YYYY-MM-DD'),
                            ativacao: r.data.response.result.ativacao,
                            sincronizado: 1
                        };
                        ValidacaoTable.save(ret, function (retorno) {
                            $scope.registro.validacaoUpload.processado++;
                            $scope.registro.validacaoUpload.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.validacaoUpload.total, $scope.registro.validacaoUpload.processado);
                        });
                    }
                });
            });
        });

        UsuariosApi.edit($scope.user.id, $scope.user, function (e) {
        });
    };

    $scope.vDownload = function () {
        ValidacaoApi.index({}, function (r) {
            if (ValidacaoModuloFactory.isParcial(r.status)) {
                $scope.registro.validacaoDownload.total = r.data.response.paging.count;
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
            } else {
                $scope.registro.validacaoDownload.concluido = true;
            }
        });
    };

    LoadModuloFactory.show();

    $scope._atualizar = function () {
        $timeout(function () {
            $scope._hide();
        }, 5000);
    };

    $scope._hide = function () {
        $scope.registro.pdv.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.pdv.total, $scope.registro.pdv.processado);
        if ($scope.registro.pdv.concluido === false) {
            $scope.registro.pdv.concluido = $scope.registro.pdv.porcentagem >= 100 ? true : false;
        }
        $scope.registro.servicos.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.servicos.total, $scope.registro.servicos.processado);
        if ($scope.registro.servicos.concluido === false) {
            $scope.registro.servicos.concluido = $scope.registro.servicos.porcentagem >= 100 ? true : false;
        }
        $scope.registro.tiers.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.tiers.total, $scope.registro.tiers.processado);
        if ($scope.registro.tiers.concluido === false) {
            $scope.registro.tiers.concluido = $scope.registro.tiers.porcentagem >= 100 ? true : false;
        }
        $scope.registro.validacaoUpload.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.validacaoUpload.total, $scope.registro.validacaoUpload.processado);
        if ($scope.registro.validacaoUpload.concluido === false) {
            $scope.registro.validacaoUpload.concluido = $scope.registro.validacaoUpload.porcentagem >= 100 ? true : false;
        }
        $scope.registro.validacaoDownload.porcentagem = ExtraModuloFactory.calulcarPorcentagem($scope.registro.validacaoDownload.total, $scope.registro.validacaoDownload.processado);
        if ($scope.registro.validacaoDownload.concluido === false) {
            $scope.registro.validacaoDownload.concluido = $scope.registro.validacaoDownload.processado >= $scope.registro.validacaoDownload.total ? true : false;
        }

        LoadModuloFactory.hide();
        LoadModuloFactory.show();

        debug('$scope.registro');
        debug($scope.registro);


        if ($scope.registro.pdv.concluido === true && $scope.registro.servicos.concluido === true && $scope.registro.tiers.concluido === true && $scope.registro.validacaoUpload.concluido === true && $scope.registro.validacaoDownload.concluido === true) {
            LoadModuloFactory.hide();
            StorageModuloFactory.local.set(StorageModuloFactory.enum.dataUltimaSincronizacao, moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00');
            ValidacaoModuloFactory.alert('Parabéns! Los datos enviados com éxito.');
        } else {
            $scope._atualizar();
        }

    };

    var retornoLogin = function (retorno) {
        if (ValidacaoModuloFactory.isOk(retorno.status)) {
            retorno.data.response.result.senha = $rootScope.user.senha;
            $rootScope.user.token = retorno.data.response.result.token;
            $rootScope.setAtualizarUser($rootScope.user);
            processaDados();
            $scope._atualizar();
            $scope.vDownload();
        } else {
            LoadModuloFactory.hide();
            ValidacaoModuloFactory.alert('No fue posible realizar la sincronización de intentarlo de nuevo, compruebe la conexión a Internet o ponerse en contacto con el administrador del sistema.' + ' | Situación de la operación: ' + retorno.status);
        }

    };

    UsuariosApi.validaLogin({login: $rootScope.user.login, id: $rootScope.user.id}, retornoLogin);


});