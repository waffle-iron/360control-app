angular.module('starter').controller('servicosCtrl', function ($scope, $stateParams, ServicosTable, PdvTable, LoadModuloFactory) {
    $scope.serve = [];
    LoadModuloFactory.show();
    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }

        ServicosTable.get($stateParams.tipo, function (r) {
            if (r !== null) {
                $scope.serve = r;
                console.log(r);
            }
            LoadModuloFactory.hide();
        });

    });

});