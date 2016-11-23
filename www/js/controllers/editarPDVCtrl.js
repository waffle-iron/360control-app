angular.module('starter').controller('editarPDVCtrl', function ($scope, $stateParams, PdvTable) {

    $scope.pdv = {};

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }
    });

    $scope.salvar = function () {
        PdvTable.save($scope.pdv, function (r) {
            if (r !== null) {
                $scope.pdv = r;
            }
        });
    };

});