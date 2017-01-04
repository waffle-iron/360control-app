angular.module('starter').controller('editarUsuarioCtrl', function (StorageModuloFactory, $rootScope, $scope, $stateParams, ValidacaoModuloFactory) {

    $scope.salvar = function () {
        $rootScope.setAtualizarUser($rootScope.user);
        StorageModuloFactory.local.set(StorageModuloFactory.enum.hasSincronizacao, 1);
        ValidacaoModuloFactory.alert('Guardado de datos com éxito.');
    };

});