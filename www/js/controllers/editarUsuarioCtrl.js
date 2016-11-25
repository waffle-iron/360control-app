angular.module('starter').controller('editarUsuarioCtrl', function ($rootScope, $scope, $stateParams, ValidacaoModuloFactory) {

    $scope.salvar = function () {
        $rootScope.setAtualizarUser($rootScope.user);
        ValidacaoModuloFactory.alert('Datos de guardado correctamente.');
    };

});