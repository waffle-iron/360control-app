angular.module('starter').controller('editarPDVCtrl', function ($rootScope, $scope, $stateParams, PdvTable, ValidacaoModuloFactory) {

    $scope.pdv = {};

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }
    });

    $scope.salvar = function () {
        $scope.pdv.sincronizado = 0;
        PdvTable.save($scope.pdv, function (r) {
            if (r !== null) {
                $scope.pdv = r;
                ValidacaoModuloFactory.alert('Guardado de datos com éxito.');
            } else {
                ValidacaoModuloFactory.alert('Error al guardar los datos, vuelva a intentarlo.');
            }
        });
    };

});