angular.module('starter').controller('loginCtrl', function ($scope, $rootScope, NavegacaoModuloFactory, UsuariosApiFactory, LoadModuloFactory, ValidacaoModuloFactory, StorageModuloFactory, PdvTable, ServicosTable, UsuariosTable, ValidacaoTable, ServicosRespostasTable, TiersItensTable) {

    PdvTable.init(function (r) {
        UsuariosTable.init(function (r) {
            ValidacaoTable.init(function (r) {
                TiersItensTable.init(function (r) {
                    ServicosRespostasTable.init(function (r) {
                        ServicosTable.init(function (r) {
                            if (ValidacaoModuloFactory.isNotNull(StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user))) {
                                LoadModuloFactory.show();
                                $rootScope.setAtualizarUser(StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user));
                                LoadModuloFactory.hide();
                                NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.home);
                            }
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
            erro.push('Informe um usuário');
        }
        if (!ValidacaoModuloFactory.isNotNull($scope.user.senha)) {
            erro.push('Informe uma senha');
        }
        if (erro.length < 1) {
            var retornoLogin = function (retorno) {
                LoadModuloFactory.hide();
                if (ValidacaoModuloFactory.is('OK', retorno.status)) {
                    retorno.data.response.result.senha = $scope.user.senha;
                    $rootScope.setAtualizarUser(retorno.data.response.result);
                    NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.home);
                } else {
                    ValidacaoModuloFactory.alert('Não foi possivel fazer o login tente novamente.');
                }
            };
            UsuariosApiFactory.login($scope.user, retornoLogin);
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