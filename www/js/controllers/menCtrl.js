angular.module('starter').controller('menCtrl', function ($rootScope, $scope, $stateParams, StorageModuloFactory) {
    $rootScope.user = StorageModuloFactory.local.getObject(StorageModuloFactory.enum.user);
});