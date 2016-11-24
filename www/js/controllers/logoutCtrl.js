angular.module('starter')

        .controller('logoutCtrl', function ($scope, LoadModuloFactory, StorageModuloFactory, NavegacaoModuloFactory) {

            LoadModuloFactory.show();

            StorageModuloFactory.local.destroy();
            LoadModuloFactory.hide();
            NavegacaoModuloFactory.go(NavegacaoModuloFactory.enum.login);

        });
