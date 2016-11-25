angular.module('starter').controller('homeCtrl', function ($rootScope, $scope, $stateParams, ExtraModuloFactory) {

    $scope.periodo = ExtraModuloFactory.saudacao();
});