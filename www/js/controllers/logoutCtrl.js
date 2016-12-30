angular.module('starter')

        .controller('logoutCtrl', function ($scope, LoadModuloFactory, ValidacaoModuloFactory, StorageModuloFactory, NavegacaoModuloFactory) {

            if (StorageModuloFactory.local.get(StorageModuloFactory.enum.hasSincronizacao, 0) === 1) {
                ValidacaoModuloFactory.alert('No es posible descargar los datos, no hay registro que se enviará al servidor.', 'Advertencia!', function (r) {
                    NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.enviarDados);
                });
            } else {
                LoadModuloFactory.show();
                StorageModuloFactory.local.destroy();
                LoadModuloFactory.hide();
                NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.login);
            }
        });
