angular.module('starter').controller('homeCtrl', function ($rootScope, $scope, $stateParams, StorageModuloFactory, NavegacaoModuloFactory, ExtraModuloFactory, CanaisTable, ValidacaoModuloFactory) {

    $scope.periodo = ExtraModuloFactory.saudacao();
    $scope.canais = [];

    var user = StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user);

    CanaisTable.all({}, function (ret) {
        angular.forEach(ret, function (rv, rk) {
            rv.status = 0;
            angular.forEach(user.usuarios_canais, function (v, k) {
                if (rv.id === v.canal_id) {
                    rv.status = 1;
                }
            });
            $scope.canais.push(rv);
        });

    });

    $scope.consultar = function (obj) {
        if (obj.status === 1) {
            NavegacaoModuloFactory.go('men.listaDePDVsCanais', {canal_id: obj.id});
        } else {
            ValidacaoModuloFactory.alert('Canal en reposo.');
        }
    };



});