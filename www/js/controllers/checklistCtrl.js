angular.module('starter').controller('checklistCtrl', function ($scope, $stateParams, ServicosTable, PdvTable, LoadModuloFactory) {
    LoadModuloFactory.show();

    $scope.id_pdv = $stateParams.id;
    $scope.serve = [];
    $scope.pdv = [];

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }

        ServicosTable.all({where: 'status=1'}, function (r) {
            if (r !== null) {
                $scope.serve = r;
            }
            LoadModuloFactory.hide();

        });

    });

});