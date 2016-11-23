angular.module('starter').controller('loginCtrl', function ($scope, $stateParams, PdvTable, ServicosTable, UsuariosTable, ValidacaoTable, ServicosRespostasTable) {
    $scope.usuario = {
        username: '',
        password: ''
    };

    PdvTable.init(function (r) {});
    ServicosTable.populaBase();
    UsuariosTable.init(function (r) {});
    ValidacaoTable.init(function (r) {});
    ServicosRespostasTable.init(function (r) {});


});