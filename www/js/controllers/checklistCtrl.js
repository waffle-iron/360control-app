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

        ServicosTable.all({
            where: 's.status=1' + (ids.length > 0 ? ' and s.id in(' + ids.join(', ') + ')' : ''),
            alias: 's',
            group: 's.id',
            from: 's.*, coalesce(sr.status, 0) as sr_status',
            join: 'LEFT JOIN servicos_respostas AS sr ON sr.servico_id = s.id AND sr.cliente_id = ' + $stateParams.id + ' AND sr.usuario_id = ' + $rootScope.user.id
        }, function (r) {
            debug(r);
            if (r !== null) {
                angular.forEach(r, function (v, k) {
                    v.color = 'button-stable';
                    if (v.sr_status == 1) {
                        v.color = 'button-balanced';
                    } else if (v.sr_status == 2) {
                        v.color = 'button-assertive';
                    } else if (v.sr_status == 3) {
                        v.color = 'button-energized';
                    }
                    $scope.serve.push(v);
                })

            }
            LoadModuloFactory.hide();

        });

    });

});