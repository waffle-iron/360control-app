angular.module('starter').controller('loginCtrl', function ($scope, $rootScope, NavegacaoModuloFactory, UsuariosApi, LoadModuloFactory, ValidacaoModuloFactory, TiersItensRespostasTable, StorageModuloFactory, PdvTable, ServicosTable, UsuariosTable, ValidacaoTable, ServicosRespostasTable, TiersItensTable, CanaisTable, TiersTable) {

    LoadModuloFactory.show();
    PdvTable.init(function (r) {
        UsuariosTable.init(function (r) {
            ValidacaoTable.init(function (r) {
                TiersItensTable.init(function (r) {
                    ServicosRespostasTable.init(function (r) {
                        TiersItensRespostasTable.init(function (r) {
                            TiersTable.init(function (r) {
                                CanaisTable.init(function (r) {
                                    ServicosTable.init(function (r) {
                                        if (ValidacaoModuloFactory.isNotNull(StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user))) {
                                            $rootScope.setAtualizarUser(StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user));
                                            LoadModuloFactory.hide();
                                            NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.home);
                                        } else {
                                            LoadModuloFactory.hide();
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    $scope.user = {
        login: null,
        senha: null
    };

    $scope.input_type = 'password';

    $scope.logar = function () {
        LoadModuloFactory.show();
        var erro = [];
        if (!ValidacaoModuloFactory.isNotNull($scope.user.login)) {
            erro.push('Introduzca un usuario');
        }
        if (!ValidacaoModuloFactory.isNotNull($scope.user.senha)) {
            erro.push('Introduzca una contraseña');
        }
        if (erro.length < 1) {
            var retornoLogin = function (retorno) {
                LoadModuloFactory.hide();
                if (ValidacaoModuloFactory.is('OK', retorno.status)) {
                    PdvTable.query('UPDATE pdv SET cor = 0', function (r) {}, []);
                    retorno.data.response.result.senha = $scope.user.senha;
                    $rootScope.setAtualizarUser(retorno.data.response.result);
                    NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.home);
                } else {
                    ValidacaoModuloFactory.alert('No se pudo iniciar sesión, inténtelo de nuevo.');
                }
            };
            UsuariosApi.login($scope.user, retornoLogin);
        } else {
            LoadModuloFactory.hide();
            angular.forEach(erro, function (v, k) {
                ValidacaoModuloFactory.alert(v);
            });
        }
    };

    $scope.mudarInputType = function () {
        if ($scope.input_type === 'password') {
            $scope.input_type = 'text';
        } else {
            $scope.input_type = 'password';
        }
    };

});