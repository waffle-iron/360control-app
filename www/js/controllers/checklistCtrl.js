angular.module('starter').controller('checklistCtrl', function ($rootScope, $scope, $stateParams, ServicosTable, PdvTable, LoadModuloFactory) {
    LoadModuloFactory.show();

    $scope.id_pdv = $stateParams.id;
    $scope.serve = [];
    $scope.pdv = [];

    var ids = [];
    angular.forEach($rootScope.user.usuarios_servicos, function (v, k) {
        ids.push(v.servico_id);
    });

    PdvTable.get($stateParams.id, function (r) {
        if (r !== null) {
            $scope.pdv = r;
        }

        ServicosTable.all({where: 'status=1' + (ids.length > 0 ? ' and id in(' + ids.join(', ') + ')' : '')}, function (r) {
            if (r !== null) {
                $scope.serve = r;
            }
            LoadModuloFactory.hide();

        });

    });

});